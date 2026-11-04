"use server";

import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { createSession, deleteSession, verifyCredentials } from "@/lib/auth";
import { loginSchema } from "@/lib/schemas";

async function getCurrentLocale() {
  try {
    return (await getLocale()) ?? "sr";
  } catch {
    return "sr";
  }
}

export async function loginAction(
  _previousState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      error: "Unesite ispravnu email adresu i lozinku (najmanje 8 karaktera).",
    };
  }

  if (!verifyCredentials(parsed.data.email, parsed.data.password)) {
    return {
      error: "Pogrešan email ili lozinka. Proverite podatke i pokušajte ponovo.",
    };
  }

  await createSession();

  const locale = await getCurrentLocale();
  redirect(`/${locale}/dashboard`);
}

export async function logoutAction() {
  await deleteSession();

  const locale = await getCurrentLocale();
  redirect(`/${locale}/login`);
}
