"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import { useTranslations } from "next-intl";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contactFormSchema) as any,
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      propertyType: "house",
      comment: "",
      consent: true,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xl">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
          {t("title")}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {t("subtitle")}
        </p>
      </div>

      {status === "success" ? (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
            {t("successTitle")}
          </h4>
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            {t("successMessage")}
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            {t("sendAnother")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {status === "error" && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-start gap-3 text-rose-800 dark:text-rose-200 text-sm">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{t("errorTitle")}</p>
                <p className="text-xs text-rose-600 dark:text-rose-300 mt-0.5">
                  {t("errorMessage")}
                </p>
              </div>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
              {t("name")} *
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder={t("namePlaceholder")}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {errors.name && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Grid: Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                {t("phone")} *
              </label>
              <input
                type="tel"
                {...register("phone")}
                placeholder={t("phonePlaceholder")}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {errors.phone && (
                <p className="text-xs text-rose-500 mt-1 font-medium">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                {t("email")} *
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder={t("emailPlaceholder")}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {errors.email && (
                <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Grid: City & Property Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                {t("city")} *
              </label>
              <input
                type="text"
                {...register("city")}
                placeholder={t("cityPlaceholder")}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {errors.city && (
                <p className="text-xs text-rose-500 mt-1 font-medium">{errors.city.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                {t("propertyType")} *
              </label>
              <select
                {...register("propertyType")}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="house">{t("house")}</option>
                <option value="apartment">{t("apartment")}</option>
                <option value="rental">{t("rental")}</option>
              </select>
              {errors.propertyType && (
                <p className="text-xs text-rose-500 mt-1 font-medium">{errors.propertyType.message}</p>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
              {t("comment")}
            </label>
            <textarea
              rows={3}
              {...register("comment")}
              placeholder={t("commentPlaceholder")}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          {/* Consent */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                {...register("consent")}
                className="mt-1 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-xs text-muted-foreground leading-snug">
                {t("consent")}
              </span>
            </label>
            {errors.consent && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.consent.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-primary text-white hover:bg-primary-dark transition-all shadow-md active:scale-95 disabled:opacity-60 text-sm mt-2"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t("sending")}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{t("submit")}</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

