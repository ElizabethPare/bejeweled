"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import ProductArt from "@/components/ProductArt";
import { ArrowRightIcon, BagIcon, MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";

export default function CartPage() {
  const { lines, setQty, removeItem, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-5 py-32 text-center">
        <BagIcon className="h-12 w-12 text-ink/25" />
        <h1 className="font-script text-3xl text-ink">Your bag is empty</h1>
        <p className="text-ink/60">
          Let&apos;s find something worth sparkling for.
        </p>
        <Link
          href="/shop"
          className="rounded-full bg-ink px-7 py-3 text-sm uppercase tracking-[0.12em] text-pearl transition-colors hover:bg-ink-soft"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 md:px-8">
      <h1 className="font-script mb-10 text-center text-4xl text-ink md:text-5xl">
        Your Bag
      </h1>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.6fr_1fr]">
        <ul className="flex flex-col gap-6">
          <AnimatePresence initial={false}>
            {lines.map((line) => (
              <motion.li
                key={line.productId}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: 40 }}
                className="flex gap-4 rounded-2xl border border-ink/8 bg-white/40 p-4"
              >
                <Link
                  href={`/product/${line.slug}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl"
                >
                  <ProductArt
                    category={line.category}
                    colorway={line.colorway}
                    accent={line.accent}
                    image={line.image}
                    size="sm"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        href={`/product/${line.slug}`}
                        className="font-medium text-ink hover:text-gold"
                      >
                        {line.name}
                      </Link>
                      <p className="text-xs text-ink/45">{line.material}</p>
                    </div>
                    <button
                      onClick={() => removeItem(line.productId)}
                      className="text-ink/40 hover:text-ink"
                      aria-label={`Remove ${line.name}`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-3 rounded-full border border-ink/10 px-3 py-1.5">
                      <button
                        onClick={() => setQty(line.productId, line.qty - 1)}
                        className="text-ink/60 hover:text-ink"
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-4 text-center text-sm">{line.qty}</span>
                      <button
                        onClick={() => setQty(line.productId, line.qty + 1)}
                        className="text-ink/60 hover:text-ink"
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-ink">
                      {formatPrice(line.price * line.qty)}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="h-max rounded-2xl border border-ink/8 bg-white/40 p-6">
          <h2 className="mb-4 font-medium text-ink">Order Summary</h2>
          <div className="flex justify-between text-sm text-ink/70">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-ink/70">
            <span>Shipping</span>
            <span>{subtotal >= 150 ? "Free" : formatPrice(9)}</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 text-base text-ink">
            <span>Total</span>
            <span>
              {formatPrice(subtotal + (subtotal >= 150 || subtotal === 0 ? 0 : 9))}
            </span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm uppercase tracking-[0.12em] text-pearl transition-colors hover:bg-ink-soft"
          >
            Checkout <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
