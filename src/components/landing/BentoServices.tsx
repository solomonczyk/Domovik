"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Reveal } from "@/components/ui/Reveal";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Flower2,
  Droplets,
  Zap,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export function BentoServices() {
  const t = useTranslations("landing.bento");

  return (
    <section className="py-20 sm:py-28 bg-linear-to-b from-background via-muted/20 to-card border-b border-border/60" id="bento">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t("badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-tight text-balance">
              {t("title")}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        {/* Bento Grid layout */}
        <Reveal delay={0.1} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          {/* Bento Item 1: Large Video & Inspection (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl bg-card border border-border overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between [transform-style:preserve-3d] hover:[transform:perspective(1200px)_rotateX(1deg)_translateY(-4px)]">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#241a15]">
              <Image
                src="/images/house-vojvodina.jpg"
                alt={t("videoTitle")}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-[center_55%] img-zoom"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1b1410] via-[#1b1410]/40 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  {t("rec")}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono font-semibold">
                  {t("gps")}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold mb-1">
                  {t("videoLabel")}
                </p>
                <h3 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-md">
                  {t("videoTitle")}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed">
                {t("videoText")}
              </p>
              <Link
                href="/visit-checklist"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-primary text-white hover:bg-primary-dark transition-all shrink-0 shadow-xs"
              >
                <span>{t("videoCta")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Item 2: Vault Key Management (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-linear-to-br from-[#241a15] to-[#1b1410] text-white border border-[#3a2a22] p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group transition-transform duration-300 hover:[transform:perspective(1200px)_rotateY(2deg)_translateY(-4px)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-6 shadow-xs">
                <Flower2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                {t("vaultCategory")}
              </span>
              <h3 className="text-xl font-black leading-tight mb-3">
                {t("vaultTitle")}
              </h3>
              <p className="text-xs text-[#b8a998] leading-relaxed">
                {t("vaultText")}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#3a2a22] flex items-center justify-between text-xs font-mono text-emerald-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> {t("vaultFooter")}
              </span>
              <Flower2 className="w-4 h-4 text-amber-400" />
            </div>
          </div>

          {/* Bento Item 3: Live Utility Monitoring (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between [transform-style:preserve-3d] hover:[transform:perspective(1200px)_rotateY(1.5deg)_translateY(-4px)]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                  <Droplets className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-500/15 px-2.5 py-1 rounded-full">
                  {t("waterBadge")}
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold block mb-1">
                {t("waterCategory")}
              </span>
              <h3 className="text-lg font-black text-foreground leading-tight mb-2">
                {t("waterTitle")}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("waterText")}
              </p>
            </div>

            <div className="mt-6 p-3 rounded-2xl bg-muted/50 border border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{t("waterFooterLabel")}</span>
              <span className="font-mono font-bold text-foreground">{t("waterFooterValue")}</span>
            </div>
          </div>

          {/* Bento Item 4: Electric & Fridge (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between [transform-style:preserve-3d] hover:[transform:perspective(1200px)_rotateY(1.5deg)_translateY(-4px)]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  {t("electricBadge")}
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold block mb-1">
                {t("electricCategory")}
              </span>
              <h3 className="text-lg font-black text-foreground leading-tight mb-2">
                {t("electricTitle")}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("electricText")}
              </p>
            </div>

            <div className="mt-6 p-3 rounded-2xl bg-muted/50 border border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{t("electricFooterLabel")}</span>
              <span className="font-mono font-bold text-foreground">{t("electricFooterValue")}</span>
            </div>
          </div>

          {/* Bento Item 5: Emergency 24/7 Hotline (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-linear-to-br from-emerald-600 to-teal-800 text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between transition-transform duration-300 hover:[transform:perspective(1200px)_rotateY(-1.5deg)_translateY(-4px)]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-6">
                <CalendarDays className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-200 font-bold block mb-1">
                {t("emergencyCategory")}
              </span>
              <h3 className="text-lg font-black leading-tight mb-2">
                {t("emergencyTitle")}
              </h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                {t("emergencyText")}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-bold">
              <span>{t("emergencyFooter")}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

