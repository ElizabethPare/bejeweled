import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";
import { getCatalog } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Todas las joyas — Bejeweled",
  description:
    "Mirá toda la colección de Bejeweled: anillos, collares, aros y pulseras.",
};

export default async function ShopPage() {
  const products = await getCatalog();
  return (
    <Suspense fallback={<div className="py-32 text-center text-ink/40">Loading…</div>}>
      <ShopClient products={products} />
    </Suspense>
  );
}
