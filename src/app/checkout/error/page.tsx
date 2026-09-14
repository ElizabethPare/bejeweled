import Link from "next/link";

export const metadata = { title: "No pudimos procesar el pago — Bejeweled" };

export default function CheckoutErrorPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-5 px-5 py-20 text-center">
      <h1 className="font-script text-4xl text-ink md:text-5xl">
        No pudimos procesar el pago
      </h1>
      <p className="max-w-sm text-ink/65">
        Mercado Pago rechazó la operación o se canceló antes de terminar. No te
        cobramos nada y tu carrito sigue como estaba, así que podés intentarlo
        de nuevo con otro medio de pago.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link
          href="/checkout"
          className="rounded-full bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.12em] text-pearl transition-colors hover:bg-ink-soft"
        >
          Intentar de nuevo
        </Link>
        <Link
          href="/shop"
          className="rounded-full border border-ink/15 px-7 py-3.5 text-sm uppercase tracking-[0.12em] text-ink transition-colors hover:border-gold hover:bg-blush-soft"
        >
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}
