import { getTranslations } from "next-intl/server";
import { Globe2, Building2, Truck, CalendarDays } from "lucide-react";

export async function TargetAudience({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "targetAudience" });

  const audiences = [
    {
      icon: Globe2,
      title: t("diaspora.title"),
      desc: t("diaspora.desc"),
      accent: "border-primary/20 bg-primary/5",
    },
    {
      icon: Building2,
      title: t("foreignOwners.title"),
      desc: t("foreignOwners.desc"),
      accent: "border-secondary/20 bg-secondary/5",
    },
    {
      icon: Truck,
      title: t("travelWorkers.title"),
      desc: t("travelWorkers.desc"),
      accent: "border-amber-500/20 bg-amber-500/5",
    },
    {
      icon: CalendarDays,
      title: t("rentalOwners.title"),
      desc: t("rentalOwners.desc"),
      accent: "border-purple-500/20 bg-purple-500/5",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted/40 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            {t("eyebrow")}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mt-1">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((aud, idx) => {
            const Icon = aud.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border ${aud.accent} shadow-xs hover:shadow-md transition-all flex flex-col`}
              >
                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-foreground mb-4 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {aud.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {aud.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

