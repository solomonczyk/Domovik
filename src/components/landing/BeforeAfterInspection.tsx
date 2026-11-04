"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Sliders, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function BeforeAfterInspection() {
  const t = useTranslations("landing.comparison");
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderMove = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <section className="py-20 sm:py-28 bg-background border-b border-border/60 relative overflow-hidden" id="poredjenje">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
              <Sliders className="w-3.5 h-3.5" />
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

        {/* Interactive Comparison Slider */}
        <Reveal delay={0.1} className="max-w-5xl mx-auto">
          <div className="relative aspect-16/9 sm:aspect-21/9 rounded-3xl overflow-hidden shadow-2xl border border-border select-none">
            {/* Background Image: AFTER (Clean & Protected) */}
            <div className="absolute inset-0">
              <Image
                src="/images/house-vojvodina.jpg"
                alt={t("afterTitle")}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover object-[center_55%]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              
              {/* Badge: Under Domovik Care */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3.5 py-1.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-white font-bold text-xs sm:text-sm hidden sm:flex items-center gap-2 shadow-lg z-10">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>{t("afterBadge")}</span>
              </div>

              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white text-right max-w-xs z-10 hidden sm:block">
                <p className="font-extrabold text-sm drop-shadow-md">{t("afterTitle")}</p>
                <p className="text-xs text-[#f5ede3] drop-shadow-sm">{t("afterText")}</p>
              </div>
            </div>

            {/* Foreground Clipped Image: BEFORE (Overgrown / Neglected) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-0 w-[1000px] sm:w-[1200px] lg:w-[1400px] h-full">
                <Image
                  src="/images/house-neglected.jpg"
                  alt={t("beforeTitle")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-cover object-[center_55%] grayscale-40 sepia-20"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              {/* Badge: Without Monitoring */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3.5 py-1.5 rounded-full bg-rose-600/90 backdrop-blur-md text-white font-bold text-xs sm:text-sm hidden sm:flex items-center gap-2 shadow-lg z-10">
                <AlertTriangle className="w-4 h-4 text-white" />
                <span>{t("beforeBadge")}</span>
              </div>

              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white text-left max-w-xs z-10 hidden sm:block">
                <p className="font-extrabold text-sm drop-shadow-md">{t("beforeTitle")}</p>
                <p className="text-xs text-[#f5ede3] drop-shadow-sm">{t("beforeText")}</p>
              </div>
            </div>

            {/* Drag Handle Divider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-2xl border-2 border-[#2b211c] flex items-center justify-center text-[#2b211c]">
                <Sliders className="w-5 h-5" />
              </div>
            </div>

            {/* Invisible Range Input for Full-area Dragging */}
            <input
              type="range"
              min="5"
              max="95"
              value={sliderPos}
              onChange={handleSliderMove}
              aria-label={t("aria")}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
            />
          </div>

          {/* Mobile legend */}
          <div className="mt-3 flex items-center justify-center gap-5 text-[11px] font-semibold sm:hidden">
            <span className="inline-flex items-center gap-1.5 text-rose-600">
              <AlertTriangle className="w-3.5 h-3.5" />
              {t("mobileBefore")}
            </span>
            <span className="inline-flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t("mobileAfter")}
            </span>
          </div>

          {/* Slider instruction helper */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground font-semibold">
            <span>{t("helper")}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

