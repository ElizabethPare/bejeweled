import Link from "next/link";
import { dbListOrders, isDbReady, type DbOrder, type OrderStatus } from "@/lib/db";
import { formatPrice } from "@/lib/products";
import { SparkleIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<OrderStatus, string> = {
  aprobado: "bg-green-100 text-green-800",
  pendiente: "bg-amber-100 text-amber-800",
  rechazado: "bg-red-100 text-red-700",
  cancelado: "bg-ink/10 text-ink/60",
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function OrdersPage() {
  let orders: DbOrder[] = [];
  let failed = false;

  if (isDbReady()) {
    try {
      orders = await dbListOrders();
    } catch {
      failed = true;
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-gold">
            <SparkleIcon className="h-3 w-3" /> Panel de administración
          </span>
          <h1 className="font-script text-3xl text-ink md:text-4xl">Tus pedidos</h1>
        </div>
        <Link
          href="/admin"
          className="rounded-full border border-ink/15 px-5 py-2.5 text-sm uppercase tracking-[0.1em] text-ink/70 transition-colors hover:border-gold hover:text-ink"
        >
          Ver productos
        </Link>
      </div>

      {(failed || !isDbReady()) && (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          Todavía no podemos leer los pedidos. Revisá que la base de datos esté
          conectada en Vercel.
        </div>
      )}

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/15 py-16 text-center">
          <p className="text-ink/60">Todavía no recibiste ningún pedido.</p>
          <p className="mt-2 text-sm text-ink/45">
            Cuando alguien compre, acá vas a ver qué pidió y a dónde enviarlo.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((o) => (
            <Link
              key={o.id}
              href={`/admin/pedidos/${o.id}`}
              className="rounded-2xl border border-ink/8 bg-white/40 p-5 transition-colors hover:border-gold"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-ink">{o.customer_name}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-[0.1em] ${STATUS_STYLE[o.status] ?? STATUS_STYLE.pendiente}`}
                    >
                      {o.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink/55">
                    {o.reference} · {formatDate(o.created_at)}
                  </p>
                  <p className="mt-1 text-sm text-ink/55">
                    {(o.items ?? []).reduce((n, i) => n + i.qty, 0)} artículo(s) ·{" "}
                    {o.city}
                  </p>
                </div>
                <span className="text-lg text-ink">{formatPrice(Number(o.total))}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
