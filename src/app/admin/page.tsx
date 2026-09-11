"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { DbProduct } from "@/lib/db";
import { formatPrice } from "@/lib/products";
import { SparkleIcon, TrashIcon } from "@/components/icons";

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<DbProduct[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function load() {
    setError(null);
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Error al cargar productos");
      setProducts([]);
      return;
    }
    setProducts(data.products);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleDelete(id: number, name: string) {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    setDeletingId(id);
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setDeletingId(null);
    if (res.ok) {
      setProducts((prev) => (prev ? prev.filter((p) => p.id !== id) : prev));
    } else {
      alert("No se pudo eliminar el producto");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-gold">
            <SparkleIcon className="h-3 w-3" /> Panel de administración
          </span>
          <h1 className="font-script text-3xl text-ink md:text-4xl">Tus productos</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="rounded-full bg-ink px-5 py-2.5 text-sm uppercase tracking-[0.1em] text-pearl transition-colors hover:bg-ink-soft"
          >
            + Nuevo producto
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-full border border-ink/15 px-5 py-2.5 text-sm uppercase tracking-[0.1em] text-ink/70 transition-colors hover:border-gold hover:text-ink"
          >
            Salir
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Link
          href="/"
          target="_blank"
          className="text-sm text-ink/50 underline hover:text-gold"
        >
          Ver el sitio →
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {products === null ? (
        <p className="py-16 text-center text-ink/40">Cargando…</p>
      ) : products.length === 0 && !error ? (
        <div className="rounded-2xl border border-dashed border-ink/15 py-16 text-center">
          <p className="text-ink/60">Todavía no cargaste ningún producto.</p>
          <Link
            href="/admin/products/new"
            className="mt-4 inline-block rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.1em] text-pearl transition-colors hover:bg-ink-soft"
          >
            Cargar el primero
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink/8">
          <table className="w-full text-left text-sm">
            <thead className="bg-blush-soft text-xs uppercase tracking-[0.08em] text-ink/50">
              <tr>
                <th className="px-4 py-3 font-medium">Producto</th>
                <th className="px-4 py-3 font-medium">Categoría</th>
                <th className="px-4 py-3 font-medium">Precio</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/8">
              {products?.map((p) => (
                <tr key={p.id} className="bg-white/40">
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div
                      className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-blush-soft"
                      style={{
                        background: p.image_url
                          ? undefined
                          : `linear-gradient(135deg, ${p.colorway}44, ${p.accent}88)`,
                      }}
                    >
                      {p.image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <span className="font-medium text-ink">{p.name}</span>
                  </td>
                  <td className="px-4 py-3 text-ink/70">{p.category}</td>
                  <td className="px-4 py-3 text-ink/70">
                    {formatPrice(Number(p.price))}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      {p.is_new && (
                        <span className="rounded-full bg-blush px-2 py-0.5 text-[10px] uppercase text-ink/60">
                          New
                        </span>
                      )}
                      {p.is_bestseller && (
                        <span className="rounded-full bg-gold/30 px-2 py-0.5 text-[10px] uppercase text-ink/60">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="text-ink/60 hover:text-gold"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deletingId === p.id}
                        className="text-ink/40 hover:text-red-600 disabled:opacity-40"
                        aria-label={`Eliminar ${p.name}`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
