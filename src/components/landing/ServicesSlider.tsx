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
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const count = Children.count(children);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

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

  // Wheel over the carousel rotates it one card at a time.
  // At the first/last card the event is not captured, so the page can continue scrolling.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let locked = false;

    const onWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      if (Math.abs(delta) < 4) return;

      const nextIndex = activeRef.current + (delta > 0 ? 1 : -1);
      if (nextIndex < 0 || nextIndex >= count) return;

      event.preventDefault();
      if (locked) return;
      locked = true;
      goTo(nextIndex);
      window.setTimeout(() => {
        locked = false;
      }, 650);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [count, goTo]);

  return (
    <div className="relative" ref={containerRef}>
      <div
        ref={trackRef}
        onScroll={updateActive}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[11vw] pb-8 pt-2 [perspective:1400px] [scrollbar-width:none] sm:gap-5 sm:px-[max(8vw,calc((100vw-900px)/2))] [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child, index) => (
          <div
            key={index}
            data-service-card
            className="relative w-[78vw] max-w-[900px] shrink-0 snap-center [transform-style:preserve-3d] sm:w-[84vw]"
            style={{
              transform: `rotateY(${(index - active) * -14}deg) translateX(${(index - active) * 18}px) translateZ(${Math.abs(index - active) * -70}px) scale(${active === index ? 1 : 0.94})`,
              opacity: active === index ? 1 : 0.62,
              zIndex: 10 - Math.abs(index - active),
              transition:
                "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease",
            }}
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
