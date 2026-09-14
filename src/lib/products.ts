export type Category = "Anillos" | "Collares" | "Aros" | "Pulseras";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAt?: number;
  description: string;
  details: string[];
  material: string;
  colorway: string; // hex used for the placeholder art + swatch
  accent: string; // secondary hex for the placeholder art gradient
  image?: string | null; // real product photo, uploaded from /admin
  isNew?: boolean;
  isBestseller?: boolean;
};

// NOTE: These are placeholder products with generated placeholder artwork
// (no real photography yet). They get replaced by whatever the shop owner
// loads from /admin — the ProductArt component falls back to an <img>
// automatically once a product has an `image` field.
export const products: Product[] = [
  {
    id: "1",
    slug: "anillo-solitario-aurora",
    name: "Anillo Solitario Aurora",
    category: "Anillos",
    price: 245,
    compareAt: 295,
    description:
      "Una piedra de corte redondo sobre una banda delicada que atrapa la luz desde todos los ángulos. Simple para todos los días, con el brillo justo para las noches.",
    details: [
      "Plata 925 con baño de oro 18k",
      "Circonia cúbica, corte brillante redondo",
      "Ancho de la banda: 1,6 mm",
      "Entrega en 5 a 7 días hábiles",
    ],
    material: "Baño de oro 18k",
    colorway: "#c8a44d",
    accent: "#f2d9df",
    isBestseller: true,
  },
  {
    id: "2",
    slug: "anillo-doble-corazon",
    name: "Anillo Doble Corazón",
    category: "Anillos",
    price: 88,
    description:
      "Dos corazones diminutos, frente a frente, sobre una banda fina para apilar. Va solo o acompañado de tus otros favoritos.",
    details: [
      "Plata 925 con baño de oro 14k",
      "Guía de talles disponible",
      "Terminación antimanchas",
    ],
    material: "Plata con baño de oro",
    colorway: "#e3c988",
    accent: "#fbf7f2",
    isNew: true,
  },
  {
    id: "3",
    slug: "anillo-sello-celestine",
    name: "Anillo Sello Celestine",
    category: "Anillos",
    price: 132,
    description:
      "Una versión moderna del clásico anillo sello, con una pequeña estrella grabada para las románticas que todavía piden deseos.",
    details: [
      "Bronce macizo con baño de oro",
      "Grabado en relieve",
      "Talles disponibles: 12 a 20",
    ],
    material: "Bronce con baño de oro",
    colorway: "#2e1b3b",
    accent: "#c8a44d",
  },
  {
    id: "4",
    slug: "collar-cadena-susurro",
    name: "Collar Cadena Susurro",
    category: "Collares",
    price: 96,
    description:
      "Una cadena finísima que se apoya sobre la clavícula — de esas que la gente te pregunta justamente porque casi no se ven.",
    details: [
      "Cadena gold filled 14k",
      "Largo regulable de 40 a 45 cm",
      "Cierre mosquetón",
    ],
    material: "Gold filled",
    colorway: "#c8a44d",
    accent: "#2e1b3b",
    isBestseller: true,
  },
  {
    id: "5",
    slug: "colgante-gota-amatista",
    name: "Colgante Gota Amatista",
    category: "Collares",
    price: 168,
    compareAt: 198,
    description:
      "Una gota facetada en tono amatista que se balancea con cada paso, engarzada en un bisel que sigue el violeta de Bejeweled.",
    details: [
      "Bisel de plata 925 con baño de oro",
      "Piedra de laboratorio, corte gota",
      "Cadena de 45 cm con extensor de 5 cm",
    ],
    material: "Baño de oro 18k",
    colorway: "#4a3560",
    accent: "#e3c988",
    isNew: true,
  },
  {
    id: "6",
    slug: "collar-medallon-petalo",
    name: "Collar Medallón Pétalo",
    category: "Collares",
    price: 142,
    description:
      "Un medallón diminuto con forma de pétalo plegado, del tamaño justo para una foto, una flor prensada y un secreto.",
    details: [
      "Plata 925, terminación espejo",
      "Abre y cierra con un clic suave",
      "Cadena forzada de 43 cm",
    ],
    material: "Plata 925",
    colorway: "#f2d9df",
    accent: "#2e1b3b",
  },
  {
    id: "7",
    slug: "aros-argolla-cascada",
    name: "Aros Argolla Cascada",
    category: "Aros",
    price: 78,
    description:
      "Argollas graduadas que juegan con la luz al moverse — tan livianas que te olvidás de que las tenés puestas.",
    details: [
      "Bronce con baño de oro 14k",
      "Hipoalergénicos, sin níquel",
      "Diámetro: 28 mm",
    ],
    material: "Bronce con baño de oro",
    colorway: "#c8a44d",
    accent: "#f8e9ec",
    isBestseller: true,
  },
  {
    id: "8",
    slug: "aros-polvo-de-estrellas",
    name: "Aros Polvo de Estrellas",
    category: "Aros",
    price: 58,
    description:
      "Un puñado de piedras diminutas en forma de estrella suave — tus nuevos aros de todos los días, para todos lados.",
    details: [
      "Plata 925 con baño de rodio",
      "Engarce pavé de circonias",
      "Incluye mariposas de cierre",
    ],
    material: "Plata con baño de rodio",
    colorway: "#fbf7f2",
    accent: "#c8a44d",
    isNew: true,
  },
  {
    id: "9",
    slug: "aros-colgantes-terciopelo",
    name: "Aros Colgantes Terciopelo",
    category: "Aros",
    price: 104,
    description:
      "Una gota facetada en violeta profundo, suspendida de un hilo de oro delicado, para las noches que piden un poco de drama.",
    details: [
      "Ganchos con baño de oro 18k",
      "Piedra de laboratorio, corte pera",
      "Largo: 32 mm",
    ],
    material: "Baño de oro 18k",
    colorway: "#2e1b3b",
    accent: "#e3c988",
  },
  {
    id: "10",
    slug: "pulsera-corazones-entrelazados",
    name: "Pulsera Corazones Entrelazados",
    category: "Pulseras",
    price: 112,
    description:
      "Una cadena de corazones diminutos entrelazados que combina con todo lo demás que tenés en la alhajera.",
    details: [
      "Cadena gold filled 14k",
      "Largo regulable de 16 a 20 cm",
      "Cierre de argolla",
    ],
    material: "Gold filled",
    colorway: "#e3c988",
    accent: "#f2d9df",
  },
  {
    id: "11",
    slug: "esclava-orbita",
    name: "Esclava Órbita",
    category: "Pulseras",
    price: 86,
    description:
      "Una esclava fina y maciza con una sola piedra engarzada que gira suavemente alrededor de la muñeca al moverte.",
    details: [
      "Plata 925 con baño de oro",
      "Talle único, entra por la mano",
      "Piedra: circonia cúbica",
    ],
    material: "Baño de oro 18k",
    colorway: "#c8a44d",
    accent: "#4a3560",
    isNew: true,
  },
  {
    id: "12",
    slug: "pulsera-riviere-luz-de-luna",
    name: "Pulsera Riviere Luz de Luna",
    category: "Pulseras",
    price: 210,
    compareAt: 260,
    description:
      "Una línea continua de piedras de corte brillante para los días en los que querés sentirte un poco luz de luna.",
    details: [
      "Plata 925 con baño de rodio",
      "Cierre de caja con traba de seguridad",
      "Largo: 18 cm",
    ],
    material: "Plata con baño de rodio",
    colorway: "#4a3560",
    accent: "#fbf7f2",
    isBestseller: true,
  },
];

export const categories: Category[] = [
  "Anillos",
  "Collares",
  "Aros",
  "Pulseras",
];

/** Slugs of the original English sample catalog. Used to recognise a
 * database that still holds nothing but the old placeholder rows, so those
 * can be swapped for the Spanish ones without ever touching real products
 * the shop owner has loaded. */
export const legacySampleSlugs = [
  "aurora-solitaire-ring",
  "twin-hearts-stacking-ring",
  "celestine-signet-ring",
  "whisper-chain-necklace",
  "amethyst-drop-pendant",
  "petal-locket-necklace",
  "cascade-hoop-earrings",
  "stardust-stud-earrings",
  "velvet-drop-earrings",
  "linked-hearts-bracelet",
  "orbit-bangle",
  "moonlit-tennis-bracelet",
];

/** Categories were stored in English before the site was translated. Any row
 * still carrying an old value is shown under its Spanish equivalent so the
 * filter chips keep matching. */
const LEGACY_CATEGORIES: Record<string, Category> = {
  Rings: "Anillos",
  Necklaces: "Collares",
  Earrings: "Aros",
  Bracelets: "Pulseras",
};

export function normalizeCategory(value: string): Category {
  if (LEGACY_CATEGORIES[value]) return LEGACY_CATEGORIES[value];
  return (categories.includes(value as Category) ? value : "Anillos") as Category;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(n: number) {
  const amount = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);
  return `$${amount}`;
}

export function getRelatedProducts(catalog: Product[], product: Product, count = 4) {
  return catalog
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}

// ---------------------------------------------------------------------
// Catalog: reads from the database (if connected) and falls back to the
// static sample list above otherwise, so the storefront works even before
// a database is attached in Vercel. The static list also doubles as the
// seed data the first time the database is used.
// ---------------------------------------------------------------------

function staticProductToInput(p: Product) {
  return {
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: p.price,
    compareAt: p.compareAt ?? null,
    description: p.description,
    details: p.details,
    material: p.material,
    colorway: p.colorway,
    accent: p.accent,
    imageUrl: p.image ?? null,
    isNew: Boolean(p.isNew),
    isBestseller: Boolean(p.isBestseller),
  };
}

function dbRowToProduct(row: {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: string | number;
  compare_at: string | number | null;
  description: string;
  details: unknown;
  material: string;
  colorway: string;
  accent: string;
  image_url: string | null;
  is_new: boolean;
  is_bestseller: boolean;
}): Product {
  return {
    id: String(row.id),
    slug: row.slug,
    name: row.name,
    category: normalizeCategory(row.category),
    price: Number(row.price),
    compareAt: row.compare_at != null ? Number(row.compare_at) : undefined,
    description: row.description,
    details: Array.isArray(row.details) ? (row.details as string[]) : [],
    material: row.material,
    colorway: row.colorway,
    accent: row.accent,
    image: row.image_url,
    isNew: row.is_new,
    isBestseller: row.is_bestseller,
  };
}

/** Full catalog for public pages: database when connected, static sample
 * list otherwise. Never throws — a database error falls back to the
 * static list so the storefront stays up. */
export async function getCatalog(): Promise<Product[]> {
  const { isDbReady, dbListProducts, dbSeedSamples } = await import("./db");
  if (!isDbReady()) return products;
  try {
    await dbSeedSamples(products.map(staticProductToInput), legacySampleSlugs);
    const rows = await dbListProducts();
    return rows.map(dbRowToProduct);
  } catch (err) {
    console.error("getCatalog: falling back to static products", err);
    return products;
  }
}

export async function getCatalogProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const { isDbReady, dbGetProductBySlug } = await import("./db");
  if (!isDbReady()) return getProductBySlug(slug);
  try {
    const row = await dbGetProductBySlug(slug);
    return row ? dbRowToProduct(row) : undefined;
  } catch (err) {
    console.error("getCatalogProductBySlug: falling back to static", err);
    return getProductBySlug(slug);
  }
}
