"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/ui/Reveal";
import { Check, ArrowRight, Sparkles, Shield } from "lucide-react";

export function PricingCards() {
  const t = useTranslations("pricing");
  const [isAnnual, setIsAnnual] = useState(false);

  // 15% discount for annual/semi-annual prepay
  const calculatePrice = (baseStr: string) => {
    const num = parseInt(baseStr.replace(/[^\d]/g, ""), 10);
    if (isNaN(num)) return baseStr;
    if (!isAnnual) return `€${num}`;
    const discounted = Math.round(num * 0.85);
    return `€${discounted}`;
  };

  const tiers = [
    {
      name: t("basic.name"),
      rawPrice: t("basic.price"),
      desc: t("basic.desc"),
      popular: false,
      features: [
        t("basic.features.0"),
        t("basic.features.1"),
        t("basic.features.2"),
        t("basic.features.3"),
        t("basic.features.4"),
      ],
    },
    {
      name: t("plus.name"),
      rawPrice: t("plus.price"),
      desc: t("plus.desc"),
      popular: true,
      features: [
        t("plus.features.0"),
        t("plus.features.1"),
        t("plus.features.2"),
        t("plus.features.3"),
        t("plus.features.4"),
        t("plus.features.5"),
      ],
    },
    {
      name: t("premium.name"),
      rawPrice: t("premium.price"),
      desc: t("premium.desc"),
      popular: false,
      features: [
        t("premium.features.0"),
        t("premium.features.1"),
        t("premium.features.2"),
        t("premium.features.3"),
        t("premium.features.4"),
        t("premium.features.5"),
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-card border-b border-border/60" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>{t("badge")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight text-balance">
              {t("title")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              {t("subtitle")}
            </p>

            {/* Interactive Billing Cycle Toggle */}
            <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-muted/80 border border-border shadow-inner">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  !isAnnual
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("monthly")}
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isAnnual
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{t("semiAnnual")}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${isAnnual ? "bg-white text-primary" : "bg-emerald-500/10 text-emerald-600"}`}>
                  {t("discount")}
                </span>
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {tiers.map((tier, idx) => {
            const displayPrice = calculatePrice(tier.rawPrice);
            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 ${
                  tier.popular
                    ? "bg-card border-2 border-primary shadow-2xl ring-8 ring-primary/5 lg:-translate-y-3"
                    : "bg-card border border-border shadow-sm hover:shadow-xl hover:border-border/80 [transform-style:preserve-3d] hover:[transform:perspective(1200px)_rotateX(1.5deg)_translateY(-4px)]"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-primary text-white shadow-md uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      {t("popular")}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground">
                      {tier.name}
                    </h3>
                    {isAnnual && (
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        {t("savings")}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mt-2 min-h-8 leading-relaxed">
                    {tier.desc}
                  </p>

                  <div className="mt-6 mb-8 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-foreground tracking-tight transition-all">
                      {displayPrice}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
                      {t("perMonth")}
                    </span>
                  </div>

                  <div className="border-t border-border pt-6 mb-8">
                    <ul className="space-y-3.5">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-foreground/90 leading-tight">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <Link
                    href="/contact"
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-xs active:scale-95 ${
                      tier.popular
                        ? "bg-primary text-white hover:bg-primary-dark shadow-primary/25 hover:shadow-lg"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    <span>{t("choosePlan")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </Reveal>

        {/* Footnotes */}
        <div className="mt-12 text-center text-xs text-muted-foreground max-w-xl mx-auto space-y-1">
          <p>ℹ️ {t("rentalNote")}</p>
          <p>📌 {t("customNote")}</p>
        </div>
      </div>
    </section>
  );
}
