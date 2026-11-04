import { createHash, timingSafeEqual } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { demoClient } from "./demoData";
import {
  createSessionToken,
  decryptSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  type SessionPayload,
} from "./session";

const demoMode = process.env.DEMO_MODE !== "false";

export const demoCredentials = {
  email:
    process.env.DEMO_LOGIN_EMAIL ?? (demoMode ? demoClient.email : ""),
  password:
    process.env.DEMO_LOGIN_PASSWORD ?? (demoMode ? "domovik2026" : ""),
};

function safeEqual(left: string, right: string) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();

  return timingSafeEqual(leftHash, rightHash);
}

export function verifyCredentials(email: string, password: string) {
  if (!demoCredentials.email || !demoCredentials.password) {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();

  return (
    safeEqual(normalizedEmail, demoCredentials.email.trim().toLowerCase()) &&
    safeEqual(password, demoCredentials.password)
  );
}

export async function createSession() {
  const payload: SessionPayload = {
    userId: demoClient.id,
    name: demoClient.name,
    email: demoCredentials.email,
  };

  const token = await createSessionToken(payload);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  return decryptSessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

async function getCurrentLocale() {
  try {
    return (await getLocale()) ?? "sr";
  } catch {
    return "sr";
  }
}

/**
 * Secure check used by pages and server data functions.
 * Proxy performs the optimistic check; this is the authoritative one.
 */
export const verifySession = cache(async () => {
  const session = await getSession();

  if (!session) {
    const locale = await getCurrentLocale();
    redirect(`/${locale}/login`);
  }

  return session;
});
