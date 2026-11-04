import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkles, Trees, HeartHandshake, Flower2, Wind, KeyRound } from "lucide-react";

export async function AdditionalServices({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "additionalServices" });

  const services = [
    {
      icon: Sparkles,
      title: t("cleaning.title"),
      desc: t("cleaning.desc"),
      image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Trees,
      title: t("yardCare.title"),
      desc: t("yardCare.desc"),
      image: "/images/service-lawn.jpg",
    },
    {
      icon: HeartHandshake,
      title: t("petCare.title"),
      desc: t("petCare.desc"),
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Flower2,
      title: t("plantWatering.title"),
      desc: t("plantWatering.desc"),
      image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Wind,
      title: t("ventilation.title"),
      desc: t("ventilation.desc"),
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: KeyRound,
      title: t("prepareArrival.title"),
      desc: t("prepareArrival.desc"),
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted/40 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              {t("eyebrow")}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mt-1 text-balance">
              {t("title")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl bg-card border border-border overflow-hidden shadow-xs hover:shadow-xl hover:border-secondary/40 transition-all duration-300 flex flex-col [transform-style:preserve-3d] hover:[transform:perspective(1000px)_rotateY(-2deg)_rotateX(1.5deg)_translateY(-4px)]"
              >
                {/* Photo with overlay */}
                <div className="relative h-40 w-full overflow-hidden bg-muted dark:bg-[#33241c]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover img-zoom"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {t("onDemand")}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-2xl bg-white text-secondary flex items-center justify-center shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
