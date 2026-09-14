import { neon } from "@neondatabase/serverless";
import type { Category } from "./products";

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED;

export const dbConfigured = Boolean(connectionString);

// `sql` is only safe to call when dbConfigured is true. Every caller in this
// file checks dbConfigured first (see isDbReady()).
const sql = connectionString ? neon(connectionString) : null;

export type DbProduct = {
  id: number;
  slug: string;
  name: string;
  category: Category;
  price: number;
  compare_at: number | null;
  description: string;
  details: string[];
  material: string;
  colorway: string;
  accent: string;
  image_url: string | null;
  is_new: boolean;
  is_bestseller: boolean;
  created_at: string;
};

let schemaReady: Promise<void> | null = null;

function ensureSchema(): Promise<void> {
  if (!sql) throw new Error("Database is not configured");
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql!`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          price NUMERIC NOT NULL,
          compare_at NUMERIC,
          description TEXT NOT NULL DEFAULT '',
          details JSONB NOT NULL DEFAULT '[]',
          material TEXT NOT NULL DEFAULT '',
          colorway TEXT NOT NULL DEFAULT '#c8a44d',
          accent TEXT NOT NULL DEFAULT '#f2d9df',
          image_url TEXT,
          is_new BOOLEAN NOT NULL DEFAULT false,
          is_bestseller BOOLEAN NOT NULL DEFAULT false,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })();
  }
  return schemaReady;
}

/** True once a connection string is present. Callers should fall back to
 * the static sample catalog (src/lib/products.ts) when this is false, so
 * the site still works before the database is connected in Vercel. */
export function isDbReady() {
  return dbConfigured;
}

export async function dbListProducts(): Promise<DbProduct[]> {
  await ensureSchema();
  const rows = await sql!`SELECT * FROM products ORDER BY created_at DESC`;
  return rows as DbProduct[];
}

export async function dbGetProductBySlug(
  slug: string
): Promise<DbProduct | null> {
  await ensureSchema();
  const rows = await sql!`SELECT * FROM products WHERE slug = ${slug} LIMIT 1`;
  return (rows[0] as DbProduct) ?? null;
}

export async function dbGetProductById(
  id: number
): Promise<DbProduct | null> {
  await ensureSchema();
  const rows = await sql!`SELECT * FROM products WHERE id = ${id} LIMIT 1`;
  return (rows[0] as DbProduct) ?? null;
}

export type ProductInput = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAt: number | null;
  description: string;
  details: string[];
  material: string;
  colorway: string;
  accent: string;
  imageUrl: string | null;
  isNew: boolean;
  isBestseller: boolean;
};

export async function dbCreateProduct(input: ProductInput) {
  await ensureSchema();
  const rows = await sql!`
    INSERT INTO products
      (slug, name, category, price, compare_at, description, details, material, colorway, accent, image_url, is_new, is_bestseller)
    VALUES
      (${input.slug}, ${input.name}, ${input.category}, ${input.price}, ${input.compareAt},
       ${input.description}, ${JSON.stringify(input.details)}, ${input.material},
       ${input.colorway}, ${input.accent}, ${input.imageUrl}, ${input.isNew}, ${input.isBestseller})
    RETURNING *
  `;
  return rows[0] as DbProduct;
}

export async function dbUpdateProduct(id: number, input: ProductInput) {
  await ensureSchema();
  const rows = await sql!`
    UPDATE products SET
      slug = ${input.slug},
      name = ${input.name},
      category = ${input.category},
      price = ${input.price},
      compare_at = ${input.compareAt},
      description = ${input.description},
      details = ${JSON.stringify(input.details)},
      material = ${input.material},
      colorway = ${input.colorway},
      accent = ${input.accent},
      image_url = ${input.imageUrl},
      is_new = ${input.isNew},
      is_bestseller = ${input.isBestseller}
    WHERE id = ${id}
    RETURNING *
  `;
  return (rows[0] as DbProduct) ?? null;
}

export async function dbDeleteProduct(id: number) {
  await ensureSchema();
  await sql!`DELETE FROM products WHERE id = ${id}`;
}

export async function dbCountProducts(): Promise<number> {
  await ensureSchema();
  const rows = await sql!`SELECT COUNT(*)::int AS count FROM products`;
  return (rows[0] as { count: number }).count;
}

export async function dbSeedIfEmpty(seed: ProductInput[]) {
  await ensureSchema();
  const count = await dbCountProducts();
  if (count > 0) return;
  for (const p of seed) {
    await dbCreateProduct(p);
  }
}

// Runs at most once per server instance — seeding is only ever relevant on
// the first catalog read.
let seedChecked = false;

/**
 * Puts the sample catalog in place when the shop has no products of its own.
 *
 * Seeds an empty table, and also replaces an older set of samples (matched by
 * `replaceableSlugs`) that is still sitting there untouched — that is how the
 * English placeholder rows get swapped for the Spanish ones.
 *
 * It deliberately does nothing as soon as the table holds a single row the
 * shop owner created, so real products are never deleted.
 */
export async function dbSeedSamples(
  seed: ProductInput[],
  replaceableSlugs: string[] = []
) {
  if (seedChecked) return;
  await ensureSchema();

  const rows = (await sql!`SELECT slug FROM products`) as { slug: string }[];
  seedChecked = true;

  if (rows.length === 0) {
    for (const p of seed) await dbCreateProduct(p);
    return;
  }

  const replaceable = new Set(replaceableSlugs);
  const onlyOldSamples = rows.every((r) => replaceable.has(r.slug));
  if (!onlyOldSamples) return; // the owner has their own products — leave it alone

  await sql!`DELETE FROM products WHERE slug = ANY(${replaceableSlugs})`;
  for (const p of seed) await dbCreateProduct(p);
}

// ---------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------

export type OrderStatus = "pendiente" | "aprobado" | "rechazado" | "cancelado";

export type OrderItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
};

export type DbOrder = {
  id: number;
  reference: string;
  status: OrderStatus;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  city: string;
  postal_code: string;
  notes: string;
  items: OrderItem[];
  total: number;
  preference_id: string | null;
  payment_id: string | null;
  payment_detail: string | null;
  created_at: string;
  updated_at: string;
};

let ordersSchemaReady: Promise<void> | null = null;

function ensureOrdersSchema(): Promise<void> {
  if (!sql) throw new Error("Database is not configured");
  if (!ordersSchemaReady) {
    ordersSchemaReady = (async () => {
      await sql!`
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          reference TEXT UNIQUE NOT NULL,
          status TEXT NOT NULL DEFAULT 'pendiente',
          customer_name TEXT NOT NULL DEFAULT '',
          customer_email TEXT NOT NULL DEFAULT '',
          customer_phone TEXT NOT NULL DEFAULT '',
          address TEXT NOT NULL DEFAULT '',
          city TEXT NOT NULL DEFAULT '',
          postal_code TEXT NOT NULL DEFAULT '',
          notes TEXT NOT NULL DEFAULT '',
          items JSONB NOT NULL DEFAULT '[]',
          total NUMERIC NOT NULL DEFAULT 0,
          preference_id TEXT,
          payment_id TEXT,
          payment_detail TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })();
  }
  return ordersSchemaReady;
}

export type NewOrder = {
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
  items: OrderItem[];
  total: number;
};

export async function dbCreateOrder(o: NewOrder): Promise<DbOrder> {
  await ensureOrdersSchema();
  const rows = await sql!`
    INSERT INTO orders
      (reference, customer_name, customer_email, customer_phone, address, city,
       postal_code, notes, items, total)
    VALUES
      (${o.reference}, ${o.customerName}, ${o.customerEmail}, ${o.customerPhone},
       ${o.address}, ${o.city}, ${o.postalCode}, ${o.notes},
       ${JSON.stringify(o.items)}, ${o.total})
    RETURNING *
  `;
  return rows[0] as DbOrder;
}

export async function dbSetOrderPreference(reference: string, preferenceId: string) {
  await ensureOrdersSchema();
  await sql!`
    UPDATE orders SET preference_id = ${preferenceId}, updated_at = now()
    WHERE reference = ${reference}
  `;
}

/** Records the outcome Mercado Pago reported for an order. */
export async function dbSetOrderPayment(
  reference: string,
  status: OrderStatus,
  paymentId: string | null,
  detail: string | null
) {
  await ensureOrdersSchema();
  await sql!`
    UPDATE orders
    SET status = ${status}, payment_id = ${paymentId},
        payment_detail = ${detail}, updated_at = now()
    WHERE reference = ${reference}
  `;
}

export async function dbListOrders(): Promise<DbOrder[]> {
  await ensureOrdersSchema();
  const rows = await sql!`SELECT * FROM orders ORDER BY created_at DESC LIMIT 200`;
  return rows as DbOrder[];
}

export async function dbGetOrder(id: number): Promise<DbOrder | null> {
  await ensureOrdersSchema();
  const rows = await sql!`SELECT * FROM orders WHERE id = ${id} LIMIT 1`;
  return (rows[0] as DbOrder) ?? null;
}

export async function dbGetOrderByReference(reference: string): Promise<DbOrder | null> {
  await ensureOrdersSchema();
  const rows = await sql!`SELECT * FROM orders WHERE reference = ${reference} LIMIT 1`;
  return (rows[0] as DbOrder) ?? null;
}
