// Lightweight session signing for the /admin panel. No extra secret is
// required in Vercel besides ADMIN_PASSWORD — that password itself is used
// as the HMAC key, so the signed cookie can't be forged without it.

export const ADMIN_COOKIE = "bjwl_admin";
const SESSION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function getSecret(): string | null {
  return process.env.ADMIN_PASSWORD || null;
}

async function hmac(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return Buffer.from(sig).toString("hex");
}

export async function createSessionToken(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const expires = Date.now() + SESSION_MS;
  const sig = await hmac(String(expires), secret);
  return `${expires}.${sig}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<boolean> {
  const secret = getSecret();
  if (!secret || !token) return false;
  const [expiresStr, sig] = token.split(".");
  const expires = Number(expiresStr);
  if (!expires || !sig || Number.isNaN(expires)) return false;
  if (Date.now() > expires) return false;
  const expected = await hmac(expiresStr, secret);
  if (expected.length !== sig.length) return false;
  // constant-time compare
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}

export function isAdminConfigured(): boolean {
  return Boolean(getSecret());
}
