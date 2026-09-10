"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { ArrowRightIcon, SparkleIcon } from "@/components/icons";

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const shipping = subtotal === 0 || subtotal >= 150 ? 0 : 9;
  const total = subtotal + shipping;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (lines.length === 0) return;
    setSubmitting(true);
    // Demo checkout — no real payment is processed.
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 900);
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-5 py-32 text-center">
        <h1 className="font-script text-3xl text-ink">Nothing to check out yet</h1>
        <p className="text-ink/60">Add a piece or two to your bag first.</p>
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
        Checkout
      </h1>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <fieldset className="rounded-2xl border border-ink/8 bg-white/40 p-6">
            <legend className="px-2 text-sm font-medium text-ink">
              Contact
            </legend>
            <input
              required
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </fieldset>

          <fieldset className="rounded-2xl border border-ink/8 bg-white/40 p-6">
            <legend className="px-2 text-sm font-medium text-ink">
              Shipping Address
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required placeholder="First name" className="rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              <input required placeholder="Last name" className="rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              <input required placeholder="Address" className="sm:col-span-2 rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              <input required placeholder="City" className="rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              <input required placeholder="Postal code" className="rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-ink/8 bg-white/40 p-6">
            <legend className="px-2 text-sm font-medium text-ink">
              Payment
            </legend>
            <p className="mb-3 text-xs text-ink/45">
              This is a demo storefront — no real payment will be charged.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required placeholder="Card number" className="sm:col-span-2 rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              <input required placeholder="MM / YY" className="rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              <input required placeholder="CVC" className="rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
            </div>
          </fieldset>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm uppercase tracking-[0.14em] text-pearl transition-colors hover:bg-ink-soft disabled:opacity-60"
          >
            {submitting ? (
              <>
                <SparkleIcon className="h-4 w-4 animate-spin text-gold" />
                Placing order…
              </>
            ) : (
              <>
                Place order — {formatPrice(total)}
                <ArrowRightIcon className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </form>

        <div className="h-max rounded-2xl border border-ink/8 bg-white/40 p-6">
          <h2 className="mb-4 font-medium text-ink">Order Summary</h2>
          <ul className="flex flex-col gap-3">
            {lines.map((line) => (
              <li key={line.productId} className="flex justify-between text-sm text-ink/70">
                <span>
                  {line.name} <span className="text-ink/40">× {line.qty}</span>
                </span>
                <span>{formatPrice(line.price * line.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 text-sm text-ink/70">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-ink/70">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 text-base text-ink">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
