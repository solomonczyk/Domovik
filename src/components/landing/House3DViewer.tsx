"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Lock,
  Droplets,
  Zap,
  Eye,
  CheckCircle2,
  Activity,
  ChevronRight,
} from "lucide-react";

interface Hotspot {
  id: string;
  name: string;
  category: string;
  top: string;
  left: string;
  status: "OK" | "ACTIVE";
  value: string;
  detail: string;
  icon: typeof Lock;
  color: string;
}

const hotspots: Hotspot[] = [
  {
    id: "door",
    name: "Ulazna vrata i pametna brava",
    category: "Perimetar",
    top: "72%",
    left: "44%",
    status: "OK",
    value: "Zaključano • 0 pokušaja",
    detail: "Fizička provera sigurnosnog cilindra i senzora prianjanja vrata pri svakom dolasku.",
    icon: Lock,
    color: "bg-emerald-500",
  },
  {
    id: "water",
    name: "Glavni vodovodni čvor i ventili",
    category: "Instalacije",
    top: "78%",
    left: "24%",
    status: "OK",
    value: "Pritisak 3.8 bar • Suvo",
    detail: "Kontrola vodomera, ventila i slavina. U slučaju havarije, momentalno zatvaranje ventila.",
    icon: Droplets,
    color: "bg-amber-500",
  },
  {
    id: "electric",
    name: "Elektro-razvodni orman",
    category: "Instalacije",
    top: "62%",
    left: "30%",
    status: "OK",
    value: "Napon stabilan • Alarm ON",
    detail: "Očitavanje potrošnje struje, provera automatskih osigurača i rada frižidera/zamrzivača.",
    icon: Zap,
    color: "bg-amber-500",
  },
  {
    id: "windows",
    name: "Prozori i sigurnosne roletne",
    category: "Sigurnost",
    top: "61%",
    left: "66%",
    status: "OK",
    value: "Zatvoreno • Stakla cela",
    detail: "Inspekcija svih prozorskih krila, krovnih prozora i provera spuštenosti roletni.",
    icon: Eye,
    color: "bg-indigo-500",
  },
  {
    id: "yard",
    name: "Fasada, oluci i prilaz",
    category: "Eksterijer",
    top: "50%",
    left: "87%",
    status: "OK",
    value: "Fasada čista • Oluci prohodni",
    detail: "Vizuelni pregled fasade, oluka i prilaznog dela posle kiše i nevremena.",
    icon: ShieldCheck,
    color: "bg-emerald-500",
  },
];

export function House3DViewer() {
  const t = useTranslations("landing.threeD");
  const hotspotCopy = t.raw("hotspots") as Array<{
    name: string;
    category: string;
    value: string;
    detail: string;
  }>;
  const localizedHotspots = hotspots.map((spot, index) => ({
    ...spot,
    ...hotspotCopy[index],
  }));
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(localizedHotspots[0]);
  const [viewMode, setViewMode] = useState<"security" | "utilities">("security");

  return (
    <section className="py-20 sm:py-28 bg-[#1b1410] text-white relative overflow-hidden border-b border-[#3a2a22]" id="3d-skener">
      {/* Background Neon Grid / Sonar Lines */}
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Activity className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>{t("badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight text-balance">
            {t("title")}
          </h2>

          <p className="text-sm sm:text-base text-[#b8a998] leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 3D Visualizer & HUD Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visualizer (8 cols) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-[#241a15]/90 border border-[#3a2a22] shadow-2xl group">
            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-end sm:justify-between pointer-events-none">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1b1410]/80 backdrop-blur-md border border-[#3a2a22] text-[11px] font-mono pointer-events-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{t("hud")}</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-[#1b1410]/80 backdrop-blur-md border border-[#3a2a22] pointer-events-auto">
                <button
                  type="button"
                  onClick={() => setViewMode("security")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    viewMode === "security" ? "bg-amber-500 text-[#1b1410]" : "text-[#b8a998] hover:text-white"
                  }`}
                >
                  {t("security")}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("utilities")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    viewMode === "utilities" ? "bg-amber-500 text-[#1b1410]" : "text-[#b8a998] hover:text-white"
                  }`}
                >
                  {t("utilities")}
                </button>
              </div>
            </div>

            {/* 3D Perspective House Image */}
            <div className="relative aspect-16/10 sm:aspect-16/9 w-full overflow-hidden">
              <Image
                src="/images/house-vojvodina.jpg"
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-[center_55%] transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1b1410]/90 via-[#1b1410]/20 to-transparent" />

              {/* Sonar Radar sweep line */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-amber-400/10 to-transparent opacity-60 animate-[scanLine_4s_ease-in-out_infinite] pointer-events-none" />

              {/* Interactive Hotspot Pins */}
              {localizedHotspots.map((spot) => {
                const isSelected = activeHotspot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveHotspot(spot)}
                    style={{ top: spot.top, left: spot.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group/pin z-20 cursor-pointer focus:outline-hidden"
                  >
                    {/* Pulsing ring */}
                    <span className="absolute -inset-2 rounded-full bg-amber-400/30 animate-ping" />
                    
                    {/* Core pin */}
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-200 border-2 ${
                        isSelected
                          ? "bg-amber-400 text-[#1b1410] border-white scale-110 ring-4 ring-amber-400/40"
                          : "bg-[#1b1410]/90 text-amber-300 border-amber-400 hover:scale-110"
                      }`}
                    >
                      <spot.icon className="w-4 h-4" />
                    </div>

                    {/* Tooltip on pin */}
                    <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 bottom-11 px-2.5 py-1 rounded-lg bg-[#1b1410]/90 backdrop-blur-md border border-[#4a382e] text-[10px] font-bold whitespace-nowrap text-white shadow-xl opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                      {spot.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Quick Bar */}
            <div className="p-4 bg-[#1b1410]/80 backdrop-blur-md border-t border-[#3a2a22]/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#b8a998] font-mono text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t("greenZone")}</span>
              </span>

              <span className="text-[11px] text-amber-400 font-bold">
                {t("selected", { name: activeHotspot.name })}
              </span>
            </div>
          </div>

          {/* Right Detail HUD Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#241a15] border border-[#3a2a22] shadow-2xl relative overflow-hidden space-y-5">
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-400 via-emerald-400 to-primary" />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                  {activeHotspot.category}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {activeHotspot.status}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white leading-tight">
                  {activeHotspot.name}
                </h3>
                <p className="text-xs font-mono text-amber-300 mt-1 font-semibold">
                  {activeHotspot.value}
                </p>
              </div>

              <p className="text-xs text-[#e2d6c8] leading-relaxed pt-2 border-t border-[#3a2a22]">
                {activeHotspot.detail}
              </p>

              {/* Hotspots Quick Switch list */}
              <div className="pt-3 border-t border-[#3a2a22] space-y-1.5">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#9a8878]">
                  {t("quickSelect")}
                </p>
                {localizedHotspots.map((spot) => {
                  const isCur = activeHotspot.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setActiveHotspot(spot)}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isCur
                          ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          : "text-[#b8a998] hover:text-white hover:bg-[#33241c]/60"
                      }`}
                    >
                      <span className="truncate">{spot.name}</span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isCur ? "text-amber-400" : "text-[#7d6c5d]"}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

