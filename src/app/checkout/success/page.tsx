"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { CheckIcon, SparkleIcon } from "@/components/icons";

const sparklePositions = [
  { top: "10%", left: "15%", delay: 0 },
  { top: "20%", left: "80%", delay: 0.3 },
  { top: "70%", left: "10%", delay: 0.6 },
  { top: "75%", left: "85%", delay: 0.15 },
  { top: "40%", left: "50%", delay: 0.45 },
  { top: "15%", left: "50%", delay: 0.9 },
];

function SuccessContent() {
  const params = useSearchParams();
  const reference = params.get("ref");
  const { clearCart } = useCart();

  // The basket is only emptied once the payment actually went through, so a
  // buyer who abandons or fails at Mercado Pago still finds their cart intact.
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center gap-6 px-5 py-20 text-center">
      {sparklePositions.map((s, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{ top: s.top, left: s.left }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.6], rotate: 180 }}
          transition={{ duration: 2.2, delay: s.delay, repeat: Infinity, repeatDelay: 1.4 }}
        >
          <SparkleIcon className="h-5 w-5 text-gold" />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-pearl"
      >
        <CheckIcon className="h-7 w-7 text-gold" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <h1 className="font-script text-4xl text-ink md:text-5xl">
          ¡Gracias por tu compra!
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-ink/65">
          Recibimos tu pago. Preparamos el pedido enseguida y te escribimos
          para coordinar el envío, que demora entre 5 y 7 días hábiles.
        </p>
        {reference && (
          <p className="mt-4 text-sm text-ink/50">
            Tu número de pedido es{" "}
            <span className="font-medium text-ink">{reference}</span>. Guardalo
            por si necesitás escribirnos.
          </p>
        )}
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.12em] text-pearl transition-colors hover:bg-ink-soft"
        >
          Seguir viendo
        </Link>
      </motion.div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <SuccessContent />
    </Suspense>
  );
}
