import Link from "next/link";

export const metadata = { title: "Pago pendiente — Bejeweled" };

export default async function CheckoutPendingPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-5 px-5 py-20 text-center">
      <h1 className="font-script text-4xl text-ink md:text-5xl">
        Tu pago está en camino
      </h1>
      <p className="max-w-md text-ink/65">
        Mercado Pago todavía está confirmando la operación. Si elegiste pagar en
        efectivo, el pago se acredita cuando lo abonás en el punto de pago.
        Apenas se acredite preparamos tu pedido y te escribimos para coordinar
        el envío.
      </p>
      {ref && (
        <p className="text-sm text-ink/50">
          Tu número de pedido es <span className="font-medium text-ink">{ref}</span>.
        </p>
      )}
      <Link
        href="/shop"
        className="mt-2 rounded-full bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.12em] text-pearl transition-colors hover:bg-ink-soft"
      >
        Seguir viendo
      </Link>
    </div>
  );
}
