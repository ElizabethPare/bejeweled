import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop All Jewelry — Bejeweled",
  description:
    "Browse Bejeweled's full collection of rings, necklaces, earrings and bracelets.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-ink/40">Loading…</div>}>
      <ShopClient />
    </Suspense>
  );
}
