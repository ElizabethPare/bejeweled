import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCatalog, getCatalogProductBySlug } from "@/lib/products";
import ProductDetailClient from "@/components/ProductDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCatalogProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Bejeweled`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const [product, catalog] = await Promise.all([
    getCatalogProductBySlug(slug),
    getCatalog(),
  ]);
  if (!product) notFound();

  return <ProductDetailClient product={product} catalog={catalog} />;
}
