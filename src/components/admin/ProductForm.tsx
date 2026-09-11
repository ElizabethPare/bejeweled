"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { DbProduct } from "@/lib/db";
import { categories } from "@/lib/products";
import { SparkleIcon } from "@/components/icons";

type FormState = {
  name: string;
  category: string;
  price: string;
  compareAt: string;
  description: string;
  details: string;
  material: string;
  colorway: string;
  accent: string;
  imageUrl: string;
  isNew: boolean;
  isBestseller: boolean;
};

function initialState(product?: DbProduct | null): FormState {
  return {
    name: product?.name ?? "",
    category: product?.category ?? categories[0],
    price: product ? String(product.price) : "",
    compareAt: product?.compare_at != null ? String(product.compare_at) : "",
    description: product?.description ?? "",
    details: product?.details?.join("\n") ?? "",
    material: product?.material ?? "",
    colorway: product?.colorway ?? "#c8a44d",
    accent: product?.accent ?? "#f2d9df",
    imageUrl: product?.image_url ?? "",
    isNew: product?.is_new ?? false,
    isBestseller: product?.is_bestseller ?? false,
  };
}

export default function ProductForm({ product }: { product?: DbProduct | null }) {
  const router = useRouter();
  const isEdit = Boolean(product);
  const [form, setForm] = useState<FormState>(initialState(product));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir la imagen");
      update("imageUrl", data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      compareAt: form.compareAt === "" ? null : Number(form.compareAt),
      description: form.description,
      details: form.details,
      material: form.material,
      colorway: form.colorway,
      accent: form.accent,
      imageUrl: form.imageUrl || null,
      isNew: form.isNew,
      isBestseller: form.isBestseller,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo guardar");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
        <div>
          <span className="mb-2 block text-sm text-ink/60">Foto</span>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-ink/20 bg-blush-soft text-center transition-colors hover:border-gold"
          >
            {form.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.imageUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="flex flex-col items-center gap-2 px-4 text-xs text-ink/50">
                <SparkleIcon className="h-5 w-5 text-gold" />
                {uploading ? "Subiendo…" : "Click para subir una foto"}
              </span>
            )}
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 text-xs text-ink/60">
                Subiendo…
              </div>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {form.imageUrl && (
            <button
              type="button"
              onClick={() => update("imageUrl", "")}
              className="mt-2 text-xs text-ink/40 underline hover:text-red-600"
            >
              Quitar foto
            </button>
          )}
          <p className="mt-2 text-xs text-ink/40">
            Sin foto se usa una ilustración de la marca.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-ink/70">
            Nombre
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="rounded-xl border border-ink/10 bg-transparent px-4 py-2.5 text-sm text-ink outline-none focus:border-gold"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5 text-sm text-ink/70">
              Categoría
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="rounded-xl border border-ink/10 bg-transparent px-4 py-2.5 text-sm text-ink outline-none focus:border-gold"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-ink/70">
              Material
              <input
                value={form.material}
                onChange={(e) => update("material", e.target.value)}
                className="rounded-xl border border-ink/10 bg-transparent px-4 py-2.5 text-sm text-ink outline-none focus:border-gold"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5 text-sm text-ink/70">
              Precio (USD)
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                className="rounded-xl border border-ink/10 bg-transparent px-4 py-2.5 text-sm text-ink outline-none focus:border-gold"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm text-ink/70">
              Precio anterior (opcional)
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.compareAt}
                onChange={(e) => update("compareAt", e.target.value)}
                className="rounded-xl border border-ink/10 bg-transparent px-4 py-2.5 text-sm text-ink outline-none focus:border-gold"
              />
            </label>
          </div>
        </div>
      </div>

      <label className="flex flex-col gap-1.5 text-sm text-ink/70">
        Descripción
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="rounded-xl border border-ink/10 bg-transparent px-4 py-2.5 text-sm text-ink outline-none focus:border-gold"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-ink/70">
        Detalles (uno por línea)
        <textarea
          rows={4}
          placeholder={"Plata 925\nPiedra circonia\nTalle único"}
          value={form.details}
          onChange={(e) => update("details", e.target.value)}
          className="rounded-xl border border-ink/10 bg-transparent px-4 py-2.5 text-sm text-ink outline-none focus:border-gold"
        />
      </label>

      {!form.imageUrl && (
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-ink/70">
            Color de la ilustración
            <input
              type="color"
              value={form.colorway}
              onChange={(e) => update("colorway", e.target.value)}
              className="h-10 w-full cursor-pointer rounded-xl border border-ink/10 bg-transparent"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-ink/70">
            Color secundario
            <input
              type="color"
              value={form.accent}
              onChange={(e) => update("accent", e.target.value)}
              className="h-10 w-full cursor-pointer rounded-xl border border-ink/10 bg-transparent"
            />
          </label>
        </div>
      )}

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input
            type="checkbox"
            checked={form.isNew}
            onChange={(e) => update("isNew", e.target.checked)}
          />
          Marcar como &quot;Nuevo&quot;
        </label>
        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input
            type="checkbox"
            checked={form.isBestseller}
            onChange={(e) => update("isBestseller", e.target.checked)}
          />
          Marcar como &quot;Bestseller&quot;
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-full bg-ink px-7 py-3 text-sm uppercase tracking-[0.12em] text-pearl transition-colors hover:bg-ink-soft disabled:opacity-60"
        >
          {saving ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear producto"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-full border border-ink/15 px-7 py-3 text-sm uppercase tracking-[0.12em] text-ink/70 transition-colors hover:border-gold hover:text-ink"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
