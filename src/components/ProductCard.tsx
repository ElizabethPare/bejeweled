"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProductArt from "./ProductArt";
import { useCart } from "@/lib/cart-context";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const { addItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative flex flex-col"
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-3xl border border-ink/5 bg-blush-soft shadow-[0_1px_2px_rgba(46,27,59,0.06)] transition-shadow duration-300 group-hover:shadow-[0_18px_40px_-16px_rgba(46,27,59,0.35)]"
      >
        <ProductArt
          category={product.category}
          colorway={product.colorway}
          accent={product.accent}
          image={product.image}
        />
        {(product.isNew || product.isBestseller) && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-pearl backdrop-blur-sm">
            {product.isNew ? "New" : "Bestseller"}
          </span>
        )}
        {product.compareAt && (
          <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink">
            Sale
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem(product);
          }}
          className="absolute inset-x-3 bottom-3 translate-y-14 rounded-full bg-ink py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-pearl opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-ink-soft"
        >
          Quick add
        </button>
      </Link>
      <Link href={`/product/${product.slug}`} className="mt-4 flex flex-col gap-1">
        <span className="text-[11px] uppercase tracking-[0.14em] text-ink/45">
          {product.category}
        </span>
        <span className="font-medium text-ink transition-colors group-hover:text-ink-soft">
          {product.name}
        </span>
        <span className="flex items-center gap-2 text-sm">
          <span className="text-ink/80">{formatPrice(product.price)}</span>
          {product.compareAt && (
            <span className="text-ink/35 line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </span>
      </Link>
    </motion.div>
  );
}
