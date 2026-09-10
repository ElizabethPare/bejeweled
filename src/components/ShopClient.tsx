"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { categories, products, type Category } from "@/lib/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "new";

export default function ShopClient() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") as Category | null;

  const [active, setActive] = useState<Category | "All">(
    urlCategory && categories.includes(urlCategory) ? urlCategory : "All"
  );
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list = [...products];
    if (active !== "All") list = list.filter((p) => p.category === active);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "new":
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        list.sort((a, b) => Number(b.isBestseller) - Number(a.isBestseller));
    }
    return list;
  }, [active, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 md:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-gold">
          The Collection
        </span>
        <h1 className="font-script mt-2 text-4xl text-ink md:text-5xl">
          Shop All Jewelry
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-ink/60">
          Every piece is designed in-house and finished by hand. Filter by
          category or sort to find your next favorite.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
          {(["All", ...categories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.1em] transition-colors ${
                active === cat
                  ? "bg-ink text-pearl"
                  : "bg-blush-soft text-ink/60 hover:bg-blush"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.1em] text-ink/50">
          <label htmlFor="sort">Sort</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-ink/10 bg-transparent px-3 py-2 text-ink outline-none focus:border-gold"
          >
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <p className="mb-6 text-center text-xs text-ink/40 sm:text-left">
        {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
      </p>

      <motion.div
        layout
        className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-ink/50">
          No pieces found in this category yet — check back soon.
        </p>
      )}
    </div>
  );
}
