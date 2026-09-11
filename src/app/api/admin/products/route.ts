import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { dbCreateProduct, dbListProducts, isDbReady } from "@/lib/db";
import { dbUnavailable, parseInput } from "@/lib/product-input";

export async function GET() {
  if (!isDbReady()) return dbUnavailable();
  const products = await dbListProducts();
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  if (!isDbReady()) return dbUnavailable();
  const body = await request.json().catch(() => null);
  const { input, error } = parseInput(body);
  if (!input) return NextResponse.json({ error }, { status: 400 });

  // Ensure slug uniqueness by appending a counter if needed.
  let slug = input.slug;
  let attempt = 1;
  const existing = await dbListProducts();
  const slugs = new Set(existing.map((p) => p.slug));
  while (slugs.has(slug)) {
    attempt += 1;
    slug = `${input.slug}-${attempt}`;
  }

  const created = await dbCreateProduct({ ...input, slug });
  return NextResponse.json({ product: created }, { status: 201 });
}
