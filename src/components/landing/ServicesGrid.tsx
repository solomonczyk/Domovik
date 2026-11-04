import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ServicesSlider } from "@/components/landing/ServicesSlider";
import { Reveal } from "@/components/ui/Reveal";
import {
  Eye,
  DoorClosed,
  Droplets,
  Mail,
  Camera,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export async function ServicesGrid({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "baseServices" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tLanding = await getTranslations({ locale, namespace: "landing.services" });
  const titles = tLanding.raw("titles") as string[];

  const services = [
    {
      icon: Eye,
      title: titles[0],
      text: t("inspection"),
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: DoorClosed,
      title: titles[1],
      text: t("windowsDoors"),
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Droplets,
      title: titles[2],
      text: t("utilities"),
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Mail,
      title: titles[3],
      text: t("mailYard"),
      image: "/images/service-yard.jpg",
    },
    {
      icon: Camera,
      title: titles[4],
      text: t("photoReport"),
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Wrench,
      title: titles[5],
      text: t("callSpecialist"),
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#3a2a22] bg-[#1b1410] py-16 sm:py-24">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-emerald-700/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/15 px-3 py-1 text-xs font-bold text-orange-200">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{tLanding("badge")}</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white text-balance sm:text-3xl lg:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-base text-[#d8cbbd]">{t("subtitle")}</p>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <ServicesSlider>
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-[#e3d7c7] bg-[#fffbf5] shadow-xl transition-all duration-300 [transform-style:preserve-3d] hover:border-primary/50 hover:shadow-2xl hover:[transform:perspective(1000px)_rotateY(-2deg)_rotateX(1.5deg)_translateY(-4px)] sm:min-h-[400px] sm:flex-row"
              >
                <div className="relative h-56 w-full shrink-0 overflow-hidden bg-muted sm:h-auto sm:w-[48%]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 78vw, 450px"
                    className="object-cover img-zoom"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fffbf5]/90 text-primary shadow-md backdrop-blur-md">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col justify-between overflow-hidden p-6 sm:p-8 lg:p-10">
                  <span className="pointer-events-none absolute -right-2 top-0 select-none text-[8rem] font-black leading-none text-[#2b211c]/5">
                    0{idx + 1}
                  </span>
                  <div className="relative">
                    <h3 className="text-2xl font-extrabold tracking-tight text-[#2b211c] sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#7a6a5d] sm:text-base">
                      {item.text}
                    </p>
                  </div>

                  <div className="relative mt-6 flex items-center justify-between border-t border-[#e3d7c7] pt-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 sm:text-xs">
                      <CheckCircle2 className="h-4 w-4" /> {tLanding("perVisit")}
                    </span>
                    <span className="font-mono text-xs text-[#a89686]">0{idx + 1}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </ServicesSlider>
      </div>

      <div className="relative mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal delay={0.1}>
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-linear-to-r from-primary to-primary-dark p-6 text-white shadow-xl sm:flex-row sm:p-8">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold">{tLanding("bannerTitle")}</h3>
              <p className="max-w-xl text-xs text-primary-100 sm:text-sm">
                {tLanding("bannerText")}
              </p>
            </div>
            <Link
              href="/visit-checklist"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-xs font-bold text-primary-700 shadow-md transition-all hover:bg-[#f3ece1] active:scale-95 sm:text-sm"
            >
              <span>{tCommon("learnMore")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
