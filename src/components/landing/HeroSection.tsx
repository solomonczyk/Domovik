"use client";

import { useCallback, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ClipboardCheck,
  Camera,
  Flower2,
  Trees,
  FileText,
  MapPin,
  CheckCircle2,
  UserCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Accent = "cyan" | "emerald" | "amber";

type Slide = {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  accent: Accent;
  icon: LucideIcon;
  bottomIcon: LucideIcon;
  topBadge: { label: string; value: string };
  bottomBadge: { label: string; value: string };
  location: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string; live?: boolean };
  checklist: string[];
};

type LocalizedSlide = {
  badge: string;
  title: string;
  description: string;
  imageAlt: string;
  topBadgeLabel: string;
  topBadgeValue: string;
  bottomBadgeLabel: string;
  bottomBadgeValue: string;
  location: string;
  primaryLabel: string;
  secondaryLabel: string;
  checklist: string[];
};

type SlideMedia = {
  id: string;
  image: string;
  accent: Accent;
  icon: LucideIcon;
  bottomIcon: LucideIcon;
  primaryHref: string;
  secondaryHref: string;
  secondaryLive?: boolean;
};

const slideMedia: SlideMedia[] = [
  {
    id: "obilazak",
    image: "/images/hero-novi-sad.jpg",
    accent: "cyan",
    icon: ClipboardCheck,
    bottomIcon: Camera,
    primaryHref: "#contact",
    secondaryHref: "/dashboard",
    secondaryLive: true,
  },
  {
    id: "izvestaj",
    image: "/images/house-vojvodina.jpg",
    accent: "emerald",
    icon: Camera,
    bottomIcon: FileText,
    primaryHref: "#izvestaj",
    secondaryHref: "#3d-skener",
  },
  {
    id: "dodatne-usluge",
    image: "/images/service-lawn.jpg",
    accent: "amber",
    icon: Flower2,
    bottomIcon: Trees,
    primaryHref: "#contact",
    secondaryHref: "#servis",
  },
];

const accentStyles: Record<
  Accent,
  {
    badge: string;
    glow: string;
    icon: string;
    dot: string;
    border: string;
  }
> = {
  cyan: {
    badge: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
    glow: "bg-emerald-500/20",
    icon: "text-emerald-300",
    dot: "bg-emerald-400",
    border: "border-emerald-400/25",
  },
  emerald: {
    badge: "border-amber-400/30 bg-amber-500/10 text-amber-300",
    glow: "bg-amber-500/20",
    icon: "text-amber-300",
    dot: "bg-amber-400",
    border: "border-amber-400/25",
  },
  amber: {
    badge: "border-orange-400/30 bg-orange-500/10 text-orange-300",
    glow: "bg-orange-500/20",
    icon: "text-orange-300",
    dot: "bg-orange-400",
    border: "border-orange-400/25",
  },
};

function CtaButton({
  href,
  label,
  variant,
  live,
}: {
  href: string;
  label: string;
  variant: "primary" | "secondary";
  live?: boolean;
}) {
  const t = useTranslations("landing.hero");
  const className =
    variant === "primary"
      ? "w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-bold bg-primary hover:bg-primary-light text-white transition-all shadow-xl hover:shadow-primary/40 active:scale-95 text-sm sm:text-base group cursor-pointer"
      : "w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold bg-[#241a15]/90 hover:bg-[#33241c] text-white border border-[#4a382e] transition-all active:scale-95 text-sm sm:text-base shadow-lg";

  const content = (
    <>
      {variant === "secondary" && !live && (
        <ArrowRight className="w-4 h-4 text-amber-300" />
      )}
      {variant === "secondary" && live && (
        <UserCheck className="w-4 h-4 text-emerald-400" />
      )}
      <span>{label}</span>
      {variant === "primary" && (
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      )}
      {live && (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300">
          {t("live")}
        </span>
      )}
    </>
  );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function HeroVisual({ slide }: { slide: Slide }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const Icon = slide.icon;
  const BottomIcon = slide.bottomIcon;
  const accent = accentStyles[slide.accent];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX((-y / (rect.height / 2)) * 10);
    setRotateY((x / (rect.width / 2)) * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="relative w-full max-w-lg [perspective:1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div
        className={`relative aspect-4/3 sm:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-2 ${accent.border} bg-[#241a15] group transition-transform duration-150 ease-out`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={slide.image}
          alt={slide.imageAlt}
          fill
          priority={slide.id === "nadzor"}
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover object-[center_45%] transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#1b1410] via-[#1b1410]/25 to-transparent" />

        <div
          className="absolute top-4 left-4 p-3.5 rounded-2xl bg-[#1b1410]/80 backdrop-blur-md border border-[#4a382e] shadow-2xl animate-float flex items-center gap-3 text-xs font-bold text-white"
          style={{ transform: "translateZ(35px)" }}
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-[#1b1410] flex items-center justify-center font-bold shadow-md">
            <Icon className="w-5 h-5 text-[#1b1410]" />
          </div>
          <div>
            <p className="text-[10px] text-[#b8a998] uppercase font-mono font-bold tracking-wider">
              {slide.topBadge.label}
            </p>
            <p className={`font-extrabold ${accent.icon}`}>
              {slide.topBadge.value}
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-4 right-4 p-4 rounded-2xl bg-[#1b1410]/85 backdrop-blur-md border border-[#4a382e] shadow-2xl animate-float-delayed flex items-center gap-3 text-xs font-bold text-white max-w-[250px]"
          style={{ transform: "translateZ(45px)" }}
        >
          <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
            <BottomIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-[#b8a998] uppercase font-mono font-bold tracking-wider">
              {slide.bottomBadge.label}
            </p>
            <p className="text-white font-bold text-xs leading-tight">
              {slide.bottomBadge.value}
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs font-semibold"
          style={{ transform: "translateZ(25px)" }}
        >
          <MapPin className={`w-3.5 h-3.5 ${accent.icon}`} />
          <span>{slide.location}</span>
        </div>
      </div>
    </div>
  );
}

function HeroSlideContent({
  slide,
  index,
}: {
  slide: Slide;
  index: number;
}) {
  const accent = accentStyles[slide.accent];
  const Icon = slide.icon;

  return (
    <div className="relative flex h-full items-center overflow-hidden">
      {/* Mobile cinematic backdrop */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src={slide.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#1b1410]/70 via-[#1b1410]/85 to-[#1b1410]" />
      </div>

      {/* Grid + ambient light */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.13] bg-[linear-gradient(to_right,#4a382e_1px,transparent_1px),linear-gradient(to_bottom,#4a382e_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className={`pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full blur-[140px] ${accent.glow}`} />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[320px] w-[320px] rounded-full bg-primary/20 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-20 pb-28 sm:px-6 sm:pb-32 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-5 text-center sm:space-y-7 lg:col-span-7 lg:text-left">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold sm:text-sm ${accent.badge}`}
            >
              <Icon className="h-4 w-4" />
              <span>{slide.badge}</span>
            </div>

            {index === 0 ? (
              <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
            ) : (
              <h2 className="text-3xl font-black leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
                {slide.title}
              </h2>
            )}

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#d8cbbd] sm:text-lg lg:mx-0">
              {slide.description}
            </p>

            <div className="flex flex-col items-center justify-center gap-3 pt-1 sm:flex-row sm:gap-4 lg:justify-start">
              <CtaButton
                href={slide.primary.href}
                label={slide.primary.label}
                variant="primary"
              />
              <CtaButton
                href={slide.secondary.href}
                label={slide.secondary.label}
                variant="secondary"
                live={slide.secondary.live}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-1 text-[11px] font-semibold text-[#d8cbbd] sm:text-xs lg:justify-start">
              {slide.checklist.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:flex lg:justify-center">
            <HeroVisual slide={slide} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const t = useTranslations("landing.hero");
  const localizedSlides = t.raw("slides") as LocalizedSlide[];
  const slides: Slide[] = slideMedia.map((media, index) => {
    const copy = localizedSlides[index];
    return {
      ...media,
      badge: copy.badge,
      title: copy.title,
      description: copy.description,
      imageAlt: copy.imageAlt,
      topBadge: { label: copy.topBadgeLabel, value: copy.topBadgeValue },
      bottomBadge: {
        label: copy.bottomBadgeLabel,
        value: copy.bottomBadgeValue,
      },
      location: copy.location,
      primary: { label: copy.primaryLabel, href: media.primaryHref },
      secondary: {
        label: copy.secondaryLabel,
        href: media.secondaryHref,
        live: media.secondaryLive,
      },
      checklist: copy.checklist,
    };
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const drumRotation = useTransform(
    scrollYProgress,
    [0, 0.08, 0.42, 0.58, 0.92, 1],
    [0, 0, -120, -120, -240, -240]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActive(
      Math.min(slides.length - 1, Math.round(latest * (slides.length - 1)))
    );
  });

  const goTo = useCallback(
    (index: number) => {
      const el = containerRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(slides.length - 1, index));
      const top = el.getBoundingClientRect().top + window.scrollY;
      const scrollable = el.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + (clamped / (slides.length - 1)) * scrollable,
        behavior: "smooth",
      });
    },
    [slides.length]
  );

  const activeAccent = accentStyles[slides[active].accent];

  return (
    <section
      ref={containerRef}
      className="relative h-[180vh] bg-[#1b1410] text-white"
    >
      <div
        className="sticky top-0 h-[100svh] overflow-hidden [perspective:2000px]"
        style={{ "--drum-radius": "clamp(360px, 42vw, 540px)" } as React.CSSProperties}
      >
        <div
          className="absolute inset-0 [transform-style:preserve-3d]"
          style={{ transform: "translateZ(calc(-1 * var(--drum-radius)))" }}
        >
          <motion.div
            style={{
              rotateX: reduce ? -active * 120 : drumRotation,
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-0"
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                data-slide={slide.id}
                aria-hidden={active !== index}
                inert={active !== index ? true : undefined}
                className={`absolute inset-0 bg-[#1b1410] [backface-visibility:hidden] ${
                  active === index ? "" : "pointer-events-none"
                }`}
                style={{
                  transform: `rotateX(${index * 120}deg) translateZ(var(--drum-radius))`,
                }}
              >
                <HeroSlideContent slide={slide} index={index} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Drum controls */}
        <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-[#3a2a22] bg-[#1b1410]/80 px-3 py-2.5 backdrop-blur-md">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label={t("previous")}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#b8a998] transition-colors hover:bg-[#33241c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="whitespace-nowrap font-mono text-[10px] font-bold tracking-widest text-[#9a8878]">
            0{active + 1} / 0{slides.length}
          </span>

          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={t("slideLabel", {
                  index: index + 1,
                  title: slide.title,
                })}
                aria-current={active === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  active === index
                    ? `w-9 ${activeAccent.dot}`
                    : "w-3.5 bg-[#4a382e] hover:bg-[#6b5444]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === slides.length - 1}
            aria-label={t("next")}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#b8a998] transition-colors hover:bg-[#33241c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 right-6 z-30 hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9a8878] sm:flex"
        >
          <span>{t("scroll")}</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
