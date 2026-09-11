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
