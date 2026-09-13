"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, SparkleIcon } from "./icons";
import ProductArt from "./ProductArt";
import type { Product } from "@/lib/products";

export default function HeroSection({ showcase }: { showcase: Product[] }) {
  const [main, ...rest] = showcase;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-soft via-pearl to-pearl">
      <div className="pointer-events-none absolute inset-0">
        <SparkleIcon className="absolute left-[6%] top-[18%] h-6 w-6 text-gold/60 animate-sparkle-float" />
        <SparkleIcon
          className="absolute right-[10%] top-[28%] h-4 w-4 text-ink/25 animate-sparkle-float"
          style={{ animationDelay: "1s" }}
        />
        <SparkleIcon
          className="absolute left-[14%] bottom-[16%] h-5 w-5 text-blush animate-sparkle-float"
          style={{ animationDelay: "2s" }}
        />
        <SparkleIcon
          className="absolute right-[18%] bottom-[24%] h-3 w-3 text-gold/70 animate-sparkle-float"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-14 md:grid-cols-2 md:px-8 md:pb-24 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-ink/70">
            <SparkleIcon className="h-3 w-3 text-gold" /> Selección
            cuidada, pieza por pieza
          </span>
          <h1 className="font-script font-script-display mt-6 text-balance text-5xl text-ink sm:text-6xl">
            Un poco de brillo,
            <br />
            todos los días
          </h1>
          <p className="mt-6 max-w-md text-balance text-ink/65">
            En Bejeweled elegimos joyas para la vida real — esas que te
            ponés sin pensarlo y que quedan igual de bien un martes
            cualquiera que el día de tu cumpleaños.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.12em] text-pearl transition-transform hover:scale-[1.03] active:scale-95"
            >
              Ver la colección
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3.5 text-sm uppercase tracking-[0.12em] text-ink transition-colors hover:border-gold hover:bg-blush-soft"
            >
              Nuestra historia
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid grid-cols-2 gap-4"
        >
          <div className="col-span-2 aspect-[3/2] overflow-hidden rounded-3xl shadow-[0_30px_60px_-20px_rgba(46,27,59,0.35)]">
            <ProductArt
              category={main.category}
              colorway={main.colorway}
              accent={main.accent}
              image={main.image}
              size="lg"
            />
          </div>
          {rest.slice(0, 2).map((p) => (
            <div
              key={p.id}
              className="aspect-square overflow-hidden rounded-3xl shadow-[0_20px_40px_-16px_rgba(46,27,59,0.3)]"
            >
              <ProductArt
                category={p.category}
                colorway={p.colorway}
                accent={p.accent}
                image={p.image}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
