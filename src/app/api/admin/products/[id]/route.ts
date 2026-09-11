import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  dbDeleteProduct,
  dbGetProductById,
  dbListProducts,
  dbUpdateProduct,
  isDbReady,
} from "@/lib/db";
import { dbUnavailable, parseInput } from "@/lib/product-input";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Ctx) {
  if (!isDbReady()) return dbUnavailable();
  const { id } = await params;
  const product = await dbGetProductById(Number(id));
  if (!product) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PATCH(request: NextRequest, { params }: Ctx) {
  if (!isDbReady()) return dbUnavailable();
  const { id } = await params;
  const numId = Number(id);

  const body = await request.json().catch(() => null);
  const { input, error } = parseInput(body);
  if (!input) return NextResponse.json({ error }, { status: 400 });

  // Ensure slug uniqueness among *other* products.
  let slug = input.slug;
  let attempt = 1;
  const existing = await dbListProducts();
  const slugs = new Set(existing.filter((p) => p.id !== numId).map((p) => p.slug));
  while (slugs.has(slug)) {
    attempt += 1;
    slug = `${input.slug}-${attempt}`;
  }

  const updated = await dbUpdateProduct(numId, { ...input, slug });
  if (!updated) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json({ product: updated });
}

export async function DELETE(_request: NextRequest, { params }: Ctx) {
  if (!isDbReady()) return dbUnavailable();
  const { id } = await params;
  await dbDeleteProduct(Number(id));
  return NextResponse.json({ ok: true });
}
