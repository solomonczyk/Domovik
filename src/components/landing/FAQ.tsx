"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQ() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-card border-b border-border/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pitanja i odgovori</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={cn(
                  "rounded-2xl border transition-all overflow-hidden",
                  isOpen
                    ? "bg-background border-primary/40 shadow-sm"
                    : "bg-background/60 border-border hover:border-border/80"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-semibold text-foreground text-sm sm:text-base focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1">{faq.q}</span>
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200",
                      isOpen
                        ? "bg-primary text-white rotate-180"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

