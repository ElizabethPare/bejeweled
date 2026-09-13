"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import ProductArt from "./ProductArt";
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon, BagIcon } from "./icons";

export default function CartDrawer() {
  const { lines, isDrawerOpen, closeDrawer, setQty, removeItem, subtotal } =
    useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
            onClick={closeDrawer}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-pearl shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="font-script text-2xl text-ink">Tu carrito</h2>
              <button onClick={closeDrawer} aria-label="Cerrar carrito">
                <CloseIcon className="h-5 w-5 text-ink" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <BagIcon className="h-10 w-10 text-ink/30" />
                <p className="text-ink/60">
                  Tu carrito está un poco vacío. Vamos a solucionarlo.
                </p>
                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="rounded-full bg-ink px-6 py-2.5 text-sm uppercase tracking-[0.12em] text-pearl transition-colors hover:bg-ink-soft"
                >
                  Ver la tienda
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="flex flex-col gap-5">
                    <AnimatePresence initial={false}>
                      {lines.map((line) => (
                        <motion.li
                          key={line.productId}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, x: 40 }}
                          transition={{ duration: 0.25 }}
                          className="flex gap-4"
                        >
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                            <ProductArt
                              category={line.category}
                              colorway={line.colorway}
                              accent={line.accent}
                              image={line.image}
                              size="sm"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <Link
                                  href={`/product/${line.slug}`}
                                  onClick={closeDrawer}
                                  className="text-sm font-medium text-ink hover:text-gold"
                                >
                                  {line.name}
                                </Link>
                                <p className="text-xs text-ink/45">
                                  {line.material}
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(line.productId)}
                                className="text-ink/40 transition-colors hover:text-ink"
                                aria-label={`Remove ${line.name}`}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center gap-3 rounded-full border border-ink/10 px-2 py-1">
                                <button
                                  onClick={() =>
                                    setQty(line.productId, line.qty - 1)
                                  }
                                  className="text-ink/60 hover:text-ink"
                                  aria-label="Restar una unidad"
                                >
                                  <MinusIcon className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-4 text-center text-sm">
                                  {line.qty}
                                </span>
                                <button
                                  onClick={() =>
                                    setQty(line.productId, line.qty + 1)
                                  }
                                  className="text-ink/60 hover:text-ink"
                                  aria-label="Sumar una unidad"
                                >
                                  <PlusIcon className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <span className="text-sm text-ink">
                                {formatPrice(line.price * line.qty)}
                              </span>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>

                <div className="border-t border-ink/10 px-6 py-5">
                  <div className="mb-4 flex items-center justify-between text-sm text-ink/70">
                    <span>Subtotal</span>
                    <span className="text-base font-medium text-ink">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="mb-4 text-xs text-ink/45">
                    El envío se calcula al finalizar la compra.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeDrawer}
                    className="block w-full rounded-full bg-ink py-3 text-center text-sm uppercase tracking-[0.14em] text-pearl transition-colors hover:bg-ink-soft"
                  >
                    Finalizar compra
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="mt-2 block w-full rounded-full border border-ink/15 py-3 text-center text-sm uppercase tracking-[0.14em] text-ink transition-colors hover:border-gold hover:bg-blush-soft"
                  >
                    Ver el carrito
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
