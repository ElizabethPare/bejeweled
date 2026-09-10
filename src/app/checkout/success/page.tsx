"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckIcon, SparkleIcon } from "@/components/icons";

const sparklePositions = [
  { top: "10%", left: "15%", delay: 0 },
  { top: "20%", left: "80%", delay: 0.3 },
  { top: "70%", left: "10%", delay: 0.6 },
  { top: "75%", left: "85%", delay: 0.15 },
  { top: "40%", left: "50%", delay: 0.45 },
  { top: "15%", left: "50%", delay: 0.9 },
];

export default function CheckoutSuccessPage() {
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
          Thank you, beautifully!
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-ink/65">
          Your order has been placed. A confirmation is on its way to your
          inbox, and your new favorites are being wrapped as we speak.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.12em] text-pearl transition-colors hover:bg-ink-soft"
        >
          Keep browsing
        </Link>
      </motion.div>
    </div>
  );
}
