"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { categories, type Category, type Product } from "@/lib/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "new";

export default function ShopClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") as Category | null;

  const [active, setActive] = useState<Category | "Todas">(
    urlCategory && categories.includes(urlCategory) ? urlCategory : "Todas"
  );
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list = [...products];
    if (active !== "Todas") list = list.filter((p) => p.category === active);
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
  }, [active, sort, products]);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 md:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-gold">
          La colección
        </span>
        <h1 className="font-script mt-2 text-4xl text-ink md:text-5xl">
          Todas las joyas
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-ink/60">
          Elegimos cada pieza a mano, una por una. Filtrá por categoría u
          ordená la lista para encontrar tu próxima favorita.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
          {(["Todas", ...categories] as const).map((cat) => (
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
          <label htmlFor="sort">Ordenar</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-ink/10 bg-transparent px-3 py-2 text-ink outline-none focus:border-gold"
          >
            <option value="featured">Destacados</option>
            <option value="new">Más nuevos</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </div>
      </div>

      <p className="mb-6 text-center text-xs text-ink/40 sm:text-left">
        {filtered.length} {filtered.length === 1 ? "pieza" : "piezas"}
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
          Todavía no hay piezas en esta categoría — volvé pronto.
        </p>
      )}
    </div>
  );
}
