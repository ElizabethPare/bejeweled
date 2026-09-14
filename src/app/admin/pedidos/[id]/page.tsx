import Link from "next/link";
import { notFound } from "next/navigation";
import { dbGetOrder, isDbReady, type OrderStatus } from "@/lib/db";
import { formatPrice } from "@/lib/products";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<OrderStatus, string> = {
  aprobado: "bg-green-100 text-green-800",
  pendiente: "bg-amber-100 text-amber-800",
  rechazado: "bg-red-100 text-red-700",
  cancelado: "bg-ink/10 text-ink/60",
};

const STATUS_HELP: Record<OrderStatus, string> = {
  aprobado: "El pago se acreditó. Ya podés preparar el envío.",
  pendiente: "Mercado Pago todavía no confirmó el pago. No lo envíes hasta que figure como aprobado.",
  rechazado: "El pago fue rechazado, así que no cobraste nada por este pedido.",
  cancelado: "El pago se canceló o se devolvió.",
};

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5 border-b border-ink/8 py-3 last:border-0 sm:flex-row sm:gap-4">
      <span className="w-40 shrink-0 text-sm text-ink/45">{label}</span>
      <span className="text-sm text-ink">{value}</span>
    </div>
  );
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isDbReady()) notFound();

  const order = await dbGetOrder(Number(id)).catch(() => null);
  if (!order) notFound();

  const items = order.items ?? [];

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 md:px-8">
      <Link href="/admin/pedidos" className="text-sm text-ink/50 hover:text-gold">
        ← Volver a los pedidos
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-script text-3xl text-ink md:text-4xl">
          Pedido {order.reference}
        </h1>
        <span
          className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.1em] ${STATUS_STYLE[order.status] ?? STATUS_STYLE.pendiente}`}
        >
          {order.status}
        </span>
      </div>
      <p className="mt-2 text-sm text-ink/55">
        {STATUS_HELP[order.status] ?? ""}
      </p>

      <section className="mt-8 rounded-2xl border border-ink/8 bg-white/40 p-6">
        <h2 className="mb-2 font-medium text-ink">Qué compró</h2>
        <ul className="flex flex-col">
          {items.map((i, idx) => (
            <li
              key={`${i.slug}-${idx}`}
              className="flex justify-between border-b border-ink/8 py-3 text-sm last:border-0"
            >
              <span className="text-ink">
                {i.name} <span className="text-ink/40">× {i.qty}</span>
              </span>
              <span className="text-ink/70">{formatPrice(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-ink/10 pt-3 text-base text-ink">
          <span>Total</span>
          <span>{formatPrice(Number(order.total))}</span>
        </div>
        <p className="mt-2 text-xs text-ink/45">
          El envío se coordina aparte y no está incluido en este total.
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-ink/8 bg-white/40 p-6">
        <h2 className="mb-2 font-medium text-ink">A dónde enviarlo</h2>
        <Row label="Nombre" value={order.customer_name} />
        <Row label="Correo" value={order.customer_email} />
        <Row label="Teléfono" value={order.customer_phone} />
        <Row label="Dirección" value={order.address} />
        <Row label="Ciudad" value={order.city} />
        <Row label="Código postal" value={order.postal_code} />
        <Row label="Aclaraciones" value={order.notes} />
      </section>

      <section className="mt-6 rounded-2xl border border-ink/8 bg-white/40 p-6">
        <h2 className="mb-2 font-medium text-ink">Pago</h2>
        <Row label="Estado" value={order.status} />
        <Row label="Detalle" value={order.payment_detail ?? ""} />
        <Row label="ID de Mercado Pago" value={order.payment_id ?? "—"} />
        <Row
          label="Fecha"
          value={new Date(order.created_at).toLocaleString("es-AR")}
        />
      </section>
    </div>
  );
}
