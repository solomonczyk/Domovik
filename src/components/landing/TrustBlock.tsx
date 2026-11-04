import { getTranslations } from "next-intl/server";
import { Video, FileCheck, MapPin, Receipt, Shield } from "lucide-react";

export async function TrustBlock({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "trust" });

  const points = [
    {
      icon: Video,
      title: t("videoEvery.title"),
      desc: t("videoEvery.desc"),
    },
    {
      icon: FileCheck,
      title: t("writtenContract.title"),
      desc: t("writtenContract.desc"),
    },
    {
      icon: MapPin,
      title: t("geoPhotos.title"),
      desc: t("geoPhotos.desc"),
    },
    {
      icon: Receipt,
      title: t("transparentPricing.title"),
      desc: t("transparentPricing.desc"),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-card border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>{t("eyebrow")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-background border border-border hover:border-primary/40 hover:shadow-md transition-all text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 text-primary flex items-center justify-center mb-5 shadow-xs">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
