import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import type { OrderStatus } from "./db";

/**
 * Mercado Pago (Checkout Pro).
 *
 * The shop owner pastes these into Vercel → Settings → Environment Variables;
 * they are never committed and never reach the browser.
 *
 *   MP_ACCESS_TOKEN    Access Token from "Tus integraciones" (the secret one)
 *   MP_WEBHOOK_SECRET  "Clave secreta" of the webhook, used to verify that an
 *                      incoming notification really came from Mercado Pago
 *
 * Everything degrades gracefully: with no token the storefront still works and
 * the checkout simply reports that payments are not connected yet.
 */
const accessToken = process.env.MP_ACCESS_TOKEN;

export const webhookSecret = process.env.MP_WEBHOOK_SECRET ?? "";

export function isMpReady() {
  return Boolean(accessToken);
}

/** True while the account is still using test credentials. */
export function isMpSandbox() {
  return Boolean(accessToken?.startsWith("TEST-"));
}

function client() {
  if (!accessToken) throw new Error("MP_ACCESS_TOKEN is not set");
  return new MercadoPagoConfig({
    accessToken,
    options: { timeout: 8000 },
  });
}

export type PreferenceItem = {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
};

export type CreatePreferenceArgs = {
  reference: string;
  items: PreferenceItem[];
  payerName: string;
  payerEmail: string;
  baseUrl: string;
};

/**
 * Creates the Checkout Pro preference and returns the URL to send the buyer to.
 * `external_reference` carries our own order reference, which is what the
 * webhook uses later to find the order again.
 */
export async function createPreference({
  reference,
  items,
  payerName,
  payerEmail,
  baseUrl,
}: CreatePreferenceArgs): Promise<string> {
  const preference = await new Preference(client()).create({
    body: {
      items: items.map((i) => ({
        id: i.id,
        title: i.title,
        quantity: i.quantity,
        unit_price: i.unit_price,
        currency_id: "ARS",
      })),
      payer: { name: payerName, email: payerEmail },
      external_reference: reference,
      statement_descriptor: "BEJEWELED",
      back_urls: {
        success: `${baseUrl}/checkout/success?ref=${reference}`,
        failure: `${baseUrl}/checkout/error?ref=${reference}`,
        pending: `${baseUrl}/checkout/pendiente?ref=${reference}`,
      },
      auto_return: "approved",
      notification_url: `${baseUrl}/api/mercadopago/webhook`,
    },
  });

  const url = preference.init_point ?? preference.sandbox_init_point;
  if (!url) throw new Error("Mercado Pago did not return a checkout URL");
  return url;
}

/** Maps a Mercado Pago payment status onto the order states we store. */
export function mapPaymentStatus(status: string | undefined): OrderStatus {
  switch (status) {
    case "approved":
      return "aprobado";
    case "rejected":
      return "rechazado";
    case "cancelled":
    case "refunded":
    case "charged_back":
      return "cancelado";
    default:
      return "pendiente";
  }
}

/** Looks a payment up by id so we never trust the status sent to the webhook. */
export async function getPayment(paymentId: string) {
  return new Payment(client()).get({ id: paymentId });
}
