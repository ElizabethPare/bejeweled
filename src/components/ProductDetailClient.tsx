"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ProductArt from "./ProductArt";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { useCart } from "@/lib/cart-context";
import {
  formatPrice,
  getRelatedProducts,
  type Product,
} from "@/lib/products";
import { CheckIcon, MinusIcon, PlusIcon, SparkleIcon } from "./icons";

const accordionSections = (product: Product) => [
  { title: "Detalles", content: product.details },
  {
    title: "Envíos y cambios",
    content: [
      "Envío estándar gratis en compras superiores a $150",
      "Los pedidos se despachan en 3 a 5 días hábiles",
      "Cambios dentro de los 30 días, en piezas sin uso",
    ],
  },
  {
    title: "Cuidado de las joyas",
    content: [
      "Guardalas en su bolsita, lejos de la humedad",
      "Sacátelas antes de nadar, bañarte o entrenar",
      "Limpialas suavemente con un paño seco",
    ],
  },
];

export default function ProductDetailClient({
  product,
  catalog,
}: {
  product: Product;
  catalog: Product[];
}) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("Detalles");
  const related = getRelatedProducts(catalog, product);

  function handleAdd() {
    addItem(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 md:px-8">
      <nav className="mb-8 flex items-center gap-2 text-xs text-ink/45">
        <Link href="/" className="hover:text-gold">Inicio</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gold">Tienda</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-gold">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-ink/70">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="aspect-square overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-24px_rgba(46,27,59,0.3)]"
        >
          <ProductArt
            category={product.category}
            colorway={product.colorway}
            accent={product.accent}
            image={product.image}
            size="lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-xs uppercase tracking-[0.18em] text-gold">
            {product.category}
          </span>
          <h1 className="font-script mt-2 text-4xl text-ink md:text-5xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl text-ink">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="text-ink/35 line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
            {(product.isNew || product.isBestseller) && (
              <span className="rounded-full bg-blush-soft px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-ink/60">
                {product.isNew ? "Recién llegado" : "Más vendido"}
              </span>
            )}
          </div>

          <p className="mt-6 max-w-md text-ink/65">{product.description}</p>

          <div className="mt-6 flex items-center gap-3 text-sm">
            <span className="text-ink/50">Material</span>
            <span className="rounded-full border border-ink/10 px-3 py-1.5 text-ink">
              {product.material}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 rounded-full border border-ink/10 px-4 py-2.5">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Restar una unidad"
                className="text-ink/60 hover:text-ink"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="w-5 text-center">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Sumar una unidad"
                className="text-ink/60 hover:text-ink"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="relative flex flex-1 min-w-[180px] items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-8 py-3.5 text-sm uppercase tracking-[0.12em] text-pearl transition-transform hover:scale-[1.02] active:scale-95"
            >
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2"
                  >
                    <CheckIcon className="h-4 w-4 text-gold" /> Agregado
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2"
                  >
                    <SparkleIcon className="h-4 w-4 text-gold" /> Agregar al carrito
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {accordionSections(product).map((section) => (
              <div key={section.title}>
                <button
                  onClick={() =>
                    setOpenSection(
                      openSection === section.title ? null : section.title
                    )
                  }
                  className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-ink"
                >
                  {section.title}
                  <motion.span
                    animate={{ rotate: openSection === section.title ? 45 : 0 }}
                    className="text-lg text-ink/50"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openSection === section.title && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden pb-4 text-sm text-ink/60"
                    >
                      {section.content.map((line) => (
                        <li key={line} className="flex gap-2 py-1">
                          <span className="text-gold">•</span> {line}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <Reveal>
            <h2 className="font-script mb-8 text-3xl text-ink md:text-4xl">
              También te puede gustar
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
