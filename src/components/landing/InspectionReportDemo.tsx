"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle2, ShieldCheck, MapPin, Clock, Camera, Play, FileText, Home } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function InspectionReportDemo() {
  const t = useTranslations("landing.report");

  return (
    <section className="py-16 sm:py-24 bg-linear-to-b from-card via-muted/30 to-background border-b border-border/60 relative overflow-hidden" id="izvestaj">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <Reveal className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
              <span>{t("badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-[1.2] text-balance">
              {t("title")}
            </h2>

            <p className="text-base text-muted-foreground leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{t("feature1Title")}</h4>
                  <p className="text-xs text-muted-foreground">{t("feature1Desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{t("feature2Title")}</h4>
                  <p className="text-xs text-muted-foreground">{t("feature2Desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Play className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{t("feature3Title")}</h4>
                  <p className="text-xs text-muted-foreground">{t("feature3Desc")}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Mock Phone / Inspection Card UI */}
          <Reveal delay={0.12} className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md rounded-[2.5rem] bg-[#241a15] p-4 shadow-2xl ring-1 ring-[#3a2a22] border-4 border-[#4a382e]/60 relative">
              {/* Speaker pill */}
              <div className="w-24 h-4 bg-[#33241c] rounded-full mx-auto mb-3" />

              {/* Screen container */}
              <div className="bg-background rounded-3xl overflow-hidden border border-border text-foreground text-xs shadow-inner">
                {/* Header inside phone */}
                <div className="bg-primary text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{t("phoneTitle")}</p>
                      <p className="text-[10px] text-primary-100 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {t("phoneLocation")}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {t("phoneStatus")}
                  </span>
                </div>

                {/* Photo showcase with badges */}
                <div className="relative h-48 w-full bg-muted dark:bg-[#33241c]">
                  <Image
                    src="/images/hero-novi-sad.jpg"
                    alt={t("photoCaption")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-[center_38%]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />
                  
                  {/* Floating tags */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>03.11.2026 • 14:22:15</span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>45.2238° N, 19.8451° E</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <span className="font-bold text-xs drop-shadow-md">{t("photoCaption")}</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-semibold flex items-center gap-1">
                      <Camera className="w-3 h-3" /> {t("photoCounter")}
                    </span>
                  </div>
                </div>

                {/* Checklist results inside card */}
                <div className="p-4 space-y-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t("checklistTitle")}
                  </p>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 text-foreground font-medium">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {t("check1")}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">{t("check1Value")}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 text-foreground font-medium">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {t("check2")}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 font-mono">{t("check2Value")}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 text-foreground font-medium">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {t("check3")}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">{t("check3Value")}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-blue-500/10 text-foreground font-medium">
                      <span className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        {t("check4")}
                      </span>
                      <span className="text-[10px] font-bold text-blue-600">{t("check4Value")}</span>
                    </div>
                  </div>

                  {/* Video button */}
                  <div className="pt-2">
                    <div className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#241a15] text-white font-bold text-[11px] shadow-sm">
                      <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                      <span>{t("videoCta")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

