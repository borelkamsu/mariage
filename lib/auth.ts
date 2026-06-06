import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "mariage-admin";

function secret() {
  return process.env.AUTH_SECRET || "development-secret-change-me";
}

export function createAdminToken() {
  const payload = "admin";
  const signature = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

export function isValidAdminToken(token?: string) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (payload !== "admin" || !signature) return false;

  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  if (signature.length !== expected.length) return false;

  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
