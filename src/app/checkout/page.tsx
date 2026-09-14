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

  // Shipping isn't priced in the storefront yet — it gets arranged with the
  // customer after the order, so it is shown as pending and left out of the total.
  const total = subtotal;

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
        <h1 className="font-script text-3xl text-ink">Todavía no hay nada para comprar</h1>
        <p className="text-ink/60">Agregá alguna pieza al carrito primero.</p>
        <Link
          href="/shop"
          className="rounded-full bg-ink px-7 py-3 text-sm uppercase tracking-[0.12em] text-pearl transition-colors hover:bg-ink-soft"
        >
          Ver la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 md:px-8">
      <h1 className="font-script mb-10 text-center text-4xl text-ink md:text-5xl">
        Finalizar compra
      </h1>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <fieldset className="rounded-2xl border border-ink/8 bg-white/40 p-6">
            <legend className="px-2 text-sm font-medium text-ink">
              Contacto
            </legend>
            <input
              required
              type="email"
              placeholder="Correo electrónico"
              className="w-full rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </fieldset>

          <fieldset className="rounded-2xl border border-ink/8 bg-white/40 p-6">
            <legend className="px-2 text-sm font-medium text-ink">
              Dirección de envío
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required placeholder="Nombre" className="rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              <input required placeholder="Apellido" className="rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              <input required placeholder="Dirección" className="sm:col-span-2 rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              <input required placeholder="Ciudad" className="rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              <input required placeholder="Código postal" className="rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-ink/8 bg-white/40 p-6">
            <legend className="px-2 text-sm font-medium text-ink">
              Pago
            </legend>
            <p className="mb-3 text-xs text-ink/45">
              Esta tienda todavía no procesa pagos reales — no se cobra nada.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required placeholder="Número de tarjeta" className="sm:col-span-2 rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              <input required placeholder="MM / AA" className="rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
              <input required placeholder="CVV" className="rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold" />
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
                Procesando pedido…
              </>
            ) : (
              <>
                Confirmar pedido — {formatPrice(total)}
                <ArrowRightIcon className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </form>

        <div className="h-max rounded-2xl border border-ink/8 bg-white/40 p-6">
          <h2 className="mb-4 font-medium text-ink">Resumen del pedido</h2>
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
            <span>Envío</span>
            <span>A coordinar</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-ink/10 pt-4 text-base text-ink">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <p className="mt-2 text-xs text-ink/45">
            Preparamos tu pedido apenas se confirma la compra. La entrega
            demora entre 5 y 7 días hábiles y el costo del envío se coordina
            aparte. No realizamos cambios ni devoluciones.
          </p>
        </div>
      </div>
    </div>
  );
}
