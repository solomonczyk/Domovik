import { randomBytes } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "domovik_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

// Development only: a fresh random secret is generated on each process start.
// Production refuses to run without an explicit SESSION_SECRET.
const DEV_SECRET = randomBytes(32).toString("base64");

export interface SessionPayload {
  userId: string;
  name: string;
  email: string;
}

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "SESSION_SECRET is not set. Refusing to sign sessions with the development secret in production."
      );
    }

    return new TextEncoder().encode(DEV_SECRET);
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT({
    userId: payload.userId,
    name: payload.name,
    email: payload.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function decryptSessionToken(
  token: string | undefined
): Promise<SessionPayload | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });

    if (
      typeof payload.userId !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.email !== "string"
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
    };
  } catch {
    return null;
  }
}
