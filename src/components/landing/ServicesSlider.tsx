"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ServicesSlider({ children }: { children: ReactNode }) {
  const t = useTranslations("landing.services");
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = [
      ...track.querySelectorAll<HTMLElement>("[data-service-card]"),
    ];
    const card = cards[Math.max(0, Math.min(cards.length - 1, index))];
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = [
      ...track.querySelectorAll<HTMLElement>("[data-service-card]"),
    ];
    const center = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let distance = Infinity;
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const delta = Math.abs(cardCenter - center);
      if (delta < distance) {
        distance = delta;
        nearest = index;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    updateActive();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateActive);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateActive]);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={updateActive}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[11vw] pb-8 pt-2 [scrollbar-width:none] sm:gap-5 sm:px-[max(8vw,calc((100vw-900px)/2))] [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child, index) => (
          <div
            key={index}
            data-service-card
            className={`w-[78vw] max-w-[900px] shrink-0 snap-center transition-all duration-500 sm:w-[84vw] ${
              active === index
                ? "scale-100 opacity-100"
                : "scale-[0.96] opacity-60"
            }`}
          >
            {child}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(active - 1)}
        disabled={active === 0}
        aria-label={t("previousServices")}
        className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/50 disabled:cursor-not-allowed disabled:opacity-20 sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        disabled={active === count - 1}
        aria-label={t("nextServices")}
        className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all hover:bg-black/50 disabled:cursor-not-allowed disabled:opacity-20 sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="mx-auto mt-1 flex max-w-5xl items-center gap-4 px-4">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-linear-to-r from-orange-400 via-amber-300 to-emerald-300 transition-all duration-300"
            style={{ width: `${((active + 1) / count) * 100}%` }}
          />
        </div>
        <span className="whitespace-nowrap font-mono text-[10px] font-bold tracking-widest text-white/50">
          0{active + 1} / 0{count}
        </span>
      </div>
    </div>
  );
}
