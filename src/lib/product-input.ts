import { NextResponse } from "next/server";
import type { ProductInput } from "@/lib/db";
import { categories, type Category } from "@/lib/products";
import { slugify } from "@/lib/slug";

export function dbUnavailable() {
  return NextResponse.json(
    {
      error:
        "No hay base de datos conectada. Conectá Postgres/Neon desde el tab Storage de tu proyecto en Vercel y volvé a intentar.",
    },
    { status: 503 }
  );
}

export function parseInput(body: unknown): { input: ProductInput | null; error?: string } {
  if (typeof body !== "object" || body === null) {
    return { input: null, error: "Datos inválidos" };
  }
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  if (!name) return { input: null, error: "El nombre es obligatorio" };

  const category = b.category as Category;
  if (!categories.includes(category)) {
    return { input: null, error: "Categoría inválida" };
  }

  const price = Number(b.price);
  if (!Number.isFinite(price) || price < 0) {
    return { input: null, error: "El precio no es válido" };
  }

  const compareAtRaw = b.compareAt;
  const compareAt =
    compareAtRaw === null || compareAtRaw === undefined || compareAtRaw === ""
      ? null
      : Number(compareAtRaw);
  if (compareAt !== null && (!Number.isFinite(compareAt) || compareAt < 0)) {
    return { input: null, error: "El precio anterior no es válido" };
  }

  const description = typeof b.description === "string" ? b.description : "";
  const material = typeof b.material === "string" ? b.material : "";
  const colorway = typeof b.colorway === "string" && b.colorway ? b.colorway : "#c8a44d";
  const accent = typeof b.accent === "string" && b.accent ? b.accent : "#f2d9df";
  const imageUrl = typeof b.imageUrl === "string" && b.imageUrl ? b.imageUrl : null;
  const isNew = Boolean(b.isNew);
  const isBestseller = Boolean(b.isBestseller);

  let details: string[] = [];
  if (Array.isArray(b.details)) {
    details = b.details.filter((d): d is string => typeof d === "string" && d.trim() !== "");
  } else if (typeof b.details === "string") {
    details = b.details
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);
  }

  const slug =
    typeof b.slug === "string" && b.slug.trim() ? slugify(b.slug) : slugify(name);

  return {
    input: {
      slug,
      name,
      category,
      price,
      compareAt,
      description,
      details,
      material,
      colorway,
      accent,
      imageUrl,
      isNew,
      isBestseller,
    },
  };
}

