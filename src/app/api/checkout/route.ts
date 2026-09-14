import { NextResponse } from "next/server";
import {
  dbCreateOrder,
  dbListProducts,
  dbSetOrderPreference,
  isDbReady,
  type OrderItem,
} from "@/lib/db";
import { createPreference, isMpReady } from "@/lib/mercadopago";
import { products as sampleProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

type IncomingLine = { slug?: unknown; qty?: unknown };

function text(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Short, human-readable reference the buyer and the shop can quote. */
function makeReference() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `BJW-${stamp}${rand}`;
}

export async function POST(request: Request) {
  if (!isMpReady()) {
    return NextResponse.json(
      {
        error:
          "Los pagos todavía no están conectados. Agregá MP_ACCESS_TOKEN en Vercel para activarlos.",
      },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido" }, { status: 400 });
  }

  const customerName = text(body.name, 120);
  const customerEmail = text(body.email, 160);
  const customerPhone = text(body.phone, 60);
  const address = text(body.address, 200);
  const city = text(body.city, 120);
  const postalCode = text(body.postalCode, 30);
  const notes = text(body.notes, 500);

  if (!customerName || !customerEmail || !address || !city) {
    return NextResponse.json(
      { error: "Faltan datos de contacto o de envío" },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return NextResponse.json({ error: "El correo no es válido" }, { status: 400 });
  }

  const rawLines = Array.isArray(body.lines) ? (body.lines as IncomingLine[]) : [];
  if (rawLines.length === 0) {
    return NextResponse.json({ error: "El carrito está vacío" }, { status: 400 });
  }

  // Prices come from the catalog, never from the browser: the cart only says
  // which product and how many, so a tampered request cannot change what the
  // buyer is charged.
  const catalog = isDbReady()
    ? (await dbListProducts()).map((p) => ({
        id: String(p.id),
        slug: p.slug,
        name: p.name,
        price: Number(p.price),
      }))
    : sampleProducts.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        price: p.price,
      }));
  const bySlug = new Map(catalog.map((p) => [p.slug, p]));

  const items: OrderItem[] = [];
  for (const line of rawLines) {
    const slug = text(line.slug, 200);
    const qty = Math.floor(Number(line.qty));
    const product = bySlug.get(slug);
    if (!product) {
      return NextResponse.json(
        { error: `Ya no está disponible uno de los productos del carrito` },
        { status: 409 }
      );
    }
    if (!Number.isFinite(qty) || qty < 1 || qty > 50) {
      return NextResponse.json({ error: "Cantidad inválida" }, { status: 400 });
    }
    items.push({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      qty,
    });
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  if (!(total > 0)) {
    return NextResponse.json({ error: "El total no es válido" }, { status: 400 });
  }

  const reference = makeReference();

  // The order is written before the buyer leaves for Mercado Pago, so the shop
  // still has the shipping details even if the payment is abandoned.
  if (isDbReady()) {
    try {
      await dbCreateOrder({
        reference,
        customerName,
        customerEmail,
        customerPhone,
        address,
        city,
        postalCode,
        notes,
        items,
        total,
      });
    } catch (err) {
      console.error("checkout: could not save the order", err);
      return NextResponse.json(
        { error: "No pudimos registrar el pedido. Probá de nuevo." },
        { status: 500 }
      );
    }
  }

  const origin = new URL(request.url).origin;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

  try {
    const checkoutUrl = await createPreference({
      reference,
      items: items.map((i) => ({
        id: i.slug,
        title: i.name,
        quantity: i.qty,
        unit_price: i.price,
      })),
      payerName: customerName,
      payerEmail: customerEmail,
      baseUrl,
    });
    if (isDbReady()) {
      await dbSetOrderPreference(reference, checkoutUrl).catch(() => {});
    }
    return NextResponse.json({ checkoutUrl, reference });
  } catch (err) {
    console.error("checkout: Mercado Pago rejected the preference", err);
    return NextResponse.json(
      { error: "Mercado Pago no pudo generar el pago. Probá de nuevo en un momento." },
      { status: 502 }
    );
  }
}
