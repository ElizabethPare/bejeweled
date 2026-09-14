import { NextResponse } from "next/server";
import { WebhookSignatureValidator } from "mercadopago";
import { dbGetOrderByReference, dbSetOrderPayment, isDbReady } from "@/lib/db";
import { getPayment, isMpReady, mapPaymentStatus, webhookSecret } from "@/lib/mercadopago";

export const dynamic = "force-dynamic";

/**
 * Payment notifications from Mercado Pago.
 *
 * Two things make this trustworthy: the `x-signature` header is verified
 * against MP_WEBHOOK_SECRET so a stranger cannot mark an order as paid, and
 * the payment is then read back from Mercado Pago's own API rather than
 * believing whatever the request body claims.
 *
 * It always answers 200 once the request is authentic — a non-200 makes
 * Mercado Pago retry for hours, and a duplicate notification is harmless
 * because writing the same status twice changes nothing.
 */
export async function POST(request: Request) {
  if (!isMpReady()) return NextResponse.json({ ok: true });

  const url = new URL(request.url);
  const dataId = url.searchParams.get("data.id") ?? url.searchParams.get("id");

  if (webhookSecret) {
    try {
      WebhookSignatureValidator.validate({
        xSignature: request.headers.get("x-signature"),
        xRequestId: request.headers.get("x-request-id"),
        dataId,
        secret: webhookSecret,
        toleranceSeconds: 300,
      });
    } catch (err) {
      console.error("mercadopago webhook: rejected signature", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  } else {
    // Without a secret configured we cannot prove the request is genuine, so
    // the notification is acknowledged but never acted on.
    console.warn("mercadopago webhook: MP_WEBHOOK_SECRET is not set — ignoring");
    return NextResponse.json({ ok: true });
  }

  let payload: { type?: string; action?: string; data?: { id?: string } } = {};
  try {
    payload = await request.json();
  } catch {
    // Some notifications arrive with an empty body and everything in the query.
  }

  const type = payload.type ?? url.searchParams.get("type") ?? "";
  const paymentId = payload.data?.id ?? dataId;

  // Only payment events carry an outcome worth recording.
  if (type !== "payment" || !paymentId) return NextResponse.json({ ok: true });

  try {
    const payment = await getPayment(String(paymentId));
    const reference = payment.external_reference;
    if (!reference) return NextResponse.json({ ok: true });

    const status = mapPaymentStatus(payment.status);
    const detail = [payment.status, payment.status_detail, payment.payment_method_id]
      .filter(Boolean)
      .join(" · ");

    if (isDbReady()) {
      const order = await dbGetOrderByReference(reference);
      if (order) {
        await dbSetOrderPayment(reference, status, String(payment.id ?? paymentId), detail);
      }
    }
  } catch (err) {
    // Logged, but still acknowledged: Mercado Pago would otherwise keep
    // retrying a notification we already know we cannot process.
    console.error("mercadopago webhook: could not process the payment", err);
  }

  return NextResponse.json({ ok: true });
}

// Mercado Pago pings the URL with GET when you save it in the dashboard.
export async function GET() {
  return NextResponse.json({ ok: true });
}
