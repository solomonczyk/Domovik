"use client";

import { useActionState, useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { loginAction } from "@/app/actions/auth";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from "lucide-react";

interface LoginFormProps {
  demoMode: boolean;
  demoEmail: string;
  demoPassword: string;
}

export function LoginForm({ demoMode, demoEmail, demoPassword }: LoginFormProps) {
  const t = useTranslations("dashboard");
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(loginAction, {});
  const [email, setEmail] = useState(demoMode ? demoEmail : "");
  const [password, setPassword] = useState(demoMode ? demoPassword : "");

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-radial from-primary-50/60 via-background to-background relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-2">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black text-foreground">
              Domovik<span className="text-emerald-500">.</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            {t("title")}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Pristupite verifikovanim izveštajima, fotografijama i video arhivu vaše nekretnine.
          </p>
        </div>

        {/* Demo Account Callout Card */}
        {demoMode && (
          <div className="p-4 rounded-3xl bg-linear-to-r from-emerald-500/10 via-teal-500/10 to-primary/10 border border-emerald-500/30 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Isprobajte rad portala za klijente:</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("demoNotice")}
            </p>
            <div className="rounded-xl bg-background/70 border border-border px-3 py-2 font-mono text-[11px] text-foreground space-y-0.5">
              <p><span className="text-muted-foreground">Email:</span> {demoEmail}</p>
              <p><span className="text-muted-foreground">Lozinka:</span> {demoPassword}</p>
            </div>
            <button
              type="button"
              onClick={() => formRef.current?.requestSubmit()}
              disabled={isPending}
              className="w-full py-3 px-4 rounded-2xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{t("quickDemoLogin")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xl">
          <form ref={formRef} action={formAction} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5"
              >
                Email adresa
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  Lozinka
                </label>
                <Link href="/contact" className="text-xs text-primary font-semibold hover:underline">
                  Zaboravljena lozinka?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  required
                  minLength={8}
                />
              </div>
            </div>

            {state?.error && (
              <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-xs text-rose-700 dark:text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{state.error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-primary hover:bg-primary-dark text-white transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <span>Prijavljivanje...</span>
              ) : (
                <>
                  <span>Uloguj se u nalog</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-border text-center text-xs text-muted-foreground">
            Nemate aktivan nalog?{" "}
            <Link href="/contact" className="text-primary font-bold hover:underline">
              Zatražite ponudu i ugovor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
