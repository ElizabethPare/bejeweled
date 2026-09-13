"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { normalizeCategory, type Category, type Product } from "./products";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  category: Category;
  colorway: string;
  accent: string;
  image?: string | null;
  material: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  lastAdded: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "bejeweled-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    // One-time hydration from localStorage after mount, so the server-
    // rendered (empty) cart matches the client's first paint exactly.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const stored: unknown = raw ? JSON.parse(raw) : null;
      // A cart saved by an older version of the site can hold categories
      // under their previous names, so each line is repaired on the way in
      // and anything unrecognisable is dropped rather than rendered.
      const restored = Array.isArray(stored)
        ? (stored as CartLine[])
            .filter((l) => l && typeof l.productId === "string" && l.qty > 0)
            .map((l) => ({ ...l, category: normalizeCategory(String(l.category)) }))
        : [];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (restored.length) setLines(restored);
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable — cart still works in memory
    }
  }, [lines, hydrated]);

  const addItem = useCallback((product: Product, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === product.id);
      if (existing) {
        return prev.map((l) =>
          l.productId === product.id ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          category: product.category,
          image: product.image,
          colorway: product.colorway,
          accent: product.accent,
          material: product.material,
          qty,
        },
      ];
    });
    setLastAdded(product.id);
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.productId === productId ? { ...l, qty } : l))
        .filter((l) => l.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.qty * l.price, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    addItem,
    removeItem,
    setQty,
    clearCart,
    lastAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
