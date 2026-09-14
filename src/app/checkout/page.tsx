"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { ArrowRightIcon, SparkleIcon } from "@/components/icons";

const inputClass =
  "rounded-xl border border-ink/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-gold";

export default function CheckoutPage() {
  const { lines, subtotal } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = subtotal;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lines.length === 0 || submitting) return;
    setError(null);
    setSubmitting(true);

    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          address: data.get("address"),
          city: data.get("city"),
          postalCode: data.get("postalCode"),
          notes: data.get("notes"),
          // Only what was bought and how many — the server puts the prices on.
          lines: lines.map((l) => ({ slug: l.slug, qty: l.qty })),
        }),
      });
      const payload = await res.json();
      if (!res.ok) {
        setError(payload.error || "No pudimos iniciar el pago. Probá de nuevo.");
        setSubmitting(false);
        return;
      }
      // The cart is deliberately left intact: it gets cleared on the success
      // page, so an abandoned or failed payment does not lose the basket.
      window.location.href = payload.checkoutUrl;
    } catch {
      setError("No pudimos conectarnos con Mercado Pago. Revisá tu conexión.");
      setSubmitting(false);
    }
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
            <legend className="px-2 text-sm font-medium text-ink">Contacto</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required name="name" placeholder="Nombre y apellido" className={`sm:col-span-2 ${inputClass}`} />
              <input required name="email" type="email" placeholder="Correo electrónico" className={inputClass} />
              <input name="phone" placeholder="Teléfono / WhatsApp" className={inputClass} />
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-ink/8 bg-white/40 p-6">
            <legend className="px-2 text-sm font-medium text-ink">Dirección de envío</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required name="address" placeholder="Calle y número, piso/depto" className={`sm:col-span-2 ${inputClass}`} />
              <input required name="city" placeholder="Ciudad / Localidad" className={inputClass} />
              <input name="postalCode" placeholder="Código postal" className={inputClass} />
              <textarea
                name="notes"
                rows={2}
                placeholder="Alguna aclaración para la entrega (opcional)"
                className={`sm:col-span-2 resize-none ${inputClass}`}
              />
            </div>
          </fieldset>

          <div className="rounded-2xl border border-ink/8 bg-white/40 p-6">
            <span className="text-sm font-medium text-ink">Pago</span>
            <p className="mt-2 text-sm text-ink/60">
              Al confirmar te llevamos a Mercado Pago para completar el pago de
              forma segura. Podés pagar con tarjeta de crédito o débito, dinero
              en tu cuenta de Mercado Pago o efectivo.
            </p>
            <p className="mt-3 text-xs text-ink/45">
              Bejeweled no ve ni guarda los datos de tu tarjeta.
            </p>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-full bg-ink py-4 text-sm uppercase tracking-[0.14em] text-pearl transition-colors hover:bg-ink-soft disabled:opacity-60"
          >
            {submitting ? (
              <>
                <SparkleIcon className="h-4 w-4 animate-spin text-gold" />
                Te llevamos a Mercado Pago…
              </>
            ) : (
              <>
                Pagar con Mercado Pago — {formatPrice(total)}
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
