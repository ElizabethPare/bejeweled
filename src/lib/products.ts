export type Category = "Rings" | "Necklaces" | "Earrings" | "Bracelets";

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
// (no real photography yet). Swap `colorway`/`accent` and add real photos
// later — the ProductArt component falls back to an <img> automatically
// once a product has an `image` field.
export const products: Product[] = [
  {
    id: "1",
    slug: "aurora-solitaire-ring",
    name: "Aurora Solitaire Ring",
    category: "Rings",
    price: 245,
    compareAt: 295,
    description:
      "A single round-cut stone set in a delicate band that catches the light from every angle. Simple enough for every day, sparkly enough for every night.",
    details: [
      "18k gold vermeil over sterling silver",
      "Lab-grown cubic zirconia, round brilliant cut",
      "Band width: 1.6mm",
      "Made to order, ships in 3–5 days",
    ],
    material: "Gold Vermeil",
    colorway: "#c8a44d",
    accent: "#f2d9df",
    isBestseller: true,
  },
  {
    id: "2",
    slug: "twin-hearts-stacking-ring",
    name: "Twin Hearts Stacking Ring",
    category: "Rings",
    price: 88,
    description:
      "Two tiny hearts, nose to nose, on a thin stacking band. Wear it alone or pile it high with your other favorites.",
    details: [
      "Sterling silver with 14k gold plating",
      "Adjustable-friendly sizing guide",
      "Tarnish-resistant coating",
    ],
    material: "Gold Plated Silver",
    colorway: "#e3c988",
    accent: "#fbf7f2",
    isNew: true,
  },
  {
    id: "3",
    slug: "celestine-signet-ring",
    name: "Celestine Signet Ring",
    category: "Rings",
    price: 132,
    description:
      "A modern take on the classic signet, engraved with a tiny star for the hopeless romantics who still wish on them.",
    details: [
      "Solid brass, gold-plated",
      "Hand-finished engraving",
      "Available in sizes 5–9",
    ],
    material: "Gold Plated Brass",
    colorway: "#2e1b3b",
    accent: "#c8a44d",
  },
  {
    id: "4",
    slug: "whisper-chain-necklace",
    name: "Whisper Chain Necklace",
    category: "Necklaces",
    price: 96,
    description:
      "An impossibly fine chain that sits close to the collarbone — the kind of necklace people ask about because it's just barely there.",
    details: [
      "14k gold-filled chain",
      '16"–18" adjustable length',
      "Lobster clasp closure",
    ],
    material: "Gold Filled",
    colorway: "#c8a44d",
    accent: "#2e1b3b",
    isBestseller: true,
  },
  {
    id: "5",
    slug: "amethyst-drop-pendant",
    name: "Amethyst Drop Pendant",
    category: "Necklaces",
    price: 168,
    compareAt: 198,
    description:
      "A faceted amethyst-hued drop that swings gently with every step, set in a hand-forged bezel true to the Bejeweled ink.",
    details: [
      "Sterling silver bezel, gold vermeil finish",
      "Lab-created stone, teardrop cut",
      '18" chain with 2" extender',
    ],
    material: "Gold Vermeil",
    colorway: "#4a3560",
    accent: "#e3c988",
    isNew: true,
  },
  {
    id: "6",
    slug: "petal-locket-necklace",
    name: "Petal Locket Necklace",
    category: "Necklaces",
    price: 142,
    description:
      "A tiny locket shaped like a folded petal, just big enough for a photo or a pressed flower and a secret.",
    details: [
      "Sterling silver, high-polish finish",
      "Opens and closes with a gentle click",
      '17" cable chain',
    ],
    material: "Sterling Silver",
    colorway: "#f2d9df",
    accent: "#2e1b3b",
  },
  {
    id: "7",
    slug: "cascade-hoop-earrings",
    name: "Cascade Hoop Earrings",
    category: "Earrings",
    price: 78,
    description:
      "Graduated hoops that catch the light as they move — lightweight enough to forget you're wearing them.",
    details: [
      "14k gold-plated brass",
      "Hypoallergenic, nickel-free posts",
      "Diameter: 28mm",
    ],
    material: "Gold Plated Brass",
    colorway: "#c8a44d",
    accent: "#f8e9ec",
    isBestseller: true,
  },
  {
    id: "8",
    slug: "stardust-stud-earrings",
    name: "Stardust Stud Earrings",
    category: "Earrings",
    price: 58,
    description:
      "A scatter of tiny pave stones pressed into a soft star shape — your new everyday, everywhere earrings.",
    details: [
      "Sterling silver with rhodium plating",
      "Cubic zirconia pave setting",
      "Butterfly backs included",
    ],
    material: "Rhodium Plated Silver",
    colorway: "#fbf7f2",
    accent: "#c8a44d",
    isNew: true,
  },
  {
    id: "9",
    slug: "velvet-drop-earrings",
    name: "Velvet Drop Earrings",
    category: "Earrings",
    price: 104,
    description:
      "A softly faceted drop in deep amethyst ink, suspended from a delicate gold thread for evenings that deserve a little drama.",
    details: [
      "Gold vermeil hook",
      "Lab-created stone, pear cut",
      "Length: 32mm",
    ],
    material: "Gold Vermeil",
    colorway: "#2e1b3b",
    accent: "#e3c988",
  },
  {
    id: "10",
    slug: "linked-hearts-bracelet",
    name: "Linked Hearts Bracelet",
    category: "Bracelets",
    price: 112,
    description:
      "A chain of tiny linked hearts that stacks beautifully with everything else in your jewelry box.",
    details: [
      "14k gold-filled chain",
      '6.5"–8" adjustable',
      "Spring ring closure",
    ],
    material: "Gold Filled",
    colorway: "#e3c988",
    accent: "#f2d9df",
  },
  {
    id: "11",
    slug: "orbit-bangle",
    name: "Orbit Bangle",
    category: "Bracelets",
    price: 86,
    description:
      "A slim, solid bangle with a single set stone that spins gently around your wrist as you move.",
    details: [
      "Sterling silver, gold vermeil finish",
      "One size, slips over the hand",
      "Stone: lab-created cubic zirconia",
    ],
    material: "Gold Vermeil",
    colorway: "#c8a44d",
    accent: "#4a3560",
    isNew: true,
  },
  {
    id: "12",
    slug: "moonlit-tennis-bracelet",
    name: "Moonlit Tennis Bracelet",
    category: "Bracelets",
    price: 210,
    compareAt: 260,
    description:
      "A continuous line of brilliant-cut stones for the days you want to feel a little bit like moonlight.",
    details: [
      "Rhodium-plated sterling silver",
      "Box clasp with figure-8 safety",
      '7" length',
    ],
    material: "Rhodium Plated Silver",
    colorway: "#4a3560",
    accent: "#fbf7f2",
    isBestseller: true,
  },
];

export const categories: Category[] = [
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(n: number) {
  return `$${n.toFixed(2)}`;
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
  category: Category;
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
    category: row.category,
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
  const { isDbReady, dbListProducts, dbSeedIfEmpty } = await import("./db");
  if (!isDbReady()) return products;
  try {
    await dbSeedIfEmpty(products.map(staticProductToInput));
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
