"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { BagIcon, CloseIcon, MenuIcon, SparkleIcon } from "./icons";

const navLinks = [
  { href: "/shop", label: "Ver todo" },
  { href: "/shop?category=Anillos", label: "Anillos" },
  { href: "/shop?category=Collares", label: "Collares" },
  { href: "/shop?category=Aros", label: "Aros" },
  { href: "/about", label: "Nosotras" },
];

export default function Header() {
  const { count, openDrawer } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="relative overflow-hidden bg-ink py-2 text-pearl">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap text-[11px] uppercase tracking-[0.18em]">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-10">
              <span className="flex items-center gap-2">
                <SparkleIcon className="h-3 w-3 text-gold" /> Envío gratis a
                partir de $150
              </span>
              <span className="flex items-center gap-2">
                <SparkleIcon className="h-3 w-3 text-gold" /> Piezas
                seleccionadas una por una
              </span>
              <span className="flex items-center gap-2">
                <SparkleIcon className="h-3 w-3 text-gold" /> Novedades todos
                los meses
              </span>
              <span className="flex items-center gap-2">
                <SparkleIcon className="h-3 w-3 text-gold" /> Envío gratis a
                partir de $150
              </span>
            </div>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-ink/8 bg-pearl/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <button
            className="flex items-center md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <MenuIcon className="h-6 w-6 text-ink" />
          </button>

          <Link href="/" className="flex flex-col items-center md:items-start">
            <span className="font-script font-script-tight text-3xl text-ink md:text-4xl">
              Bejeweled
            </span>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.35em] text-gold">
              Jewelry
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors hover:text-gold ${
                  pathname === link.href.split("?")[0]
                    ? "text-ink"
                    : "text-ink/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={openDrawer}
            className="relative flex items-center gap-2 rounded-full border border-ink/10 px-3 py-2 transition-colors hover:border-gold hover:bg-blush-soft"
            aria-label="Abrir carrito"
          >
            <BagIcon className="h-5 w-5 text-ink" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-ink"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed left-0 top-0 z-50 h-full w-[80%] max-w-xs bg-pearl p-6 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-script text-2xl text-ink">Bejeweled</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
                  <CloseIcon className="h-6 w-6 text-ink" />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg text-ink/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
