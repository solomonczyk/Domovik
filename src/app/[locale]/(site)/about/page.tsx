import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { ShieldCheck, HeartHandshake, Award, Clock, MapPin, CheckCircle2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCta = await getTranslations({ locale, namespace: "cta" });
  const tContact = await getTranslations({ locale, namespace: "contact" });

  const values = [
    {
      icon: ShieldCheck,
      title: t("v1Title"),
      desc: t("v1Desc"),
    },
    {
      icon: Clock,
      title: t("v2Title"),
      desc: t("v2Desc"),
    },
    {
      icon: Award,
      title: t("v3Title"),
      desc: t("v3Desc"),
    },
    {
      icon: HeartHandshake,
      title: t("v4Title"),
      desc: t("v4Desc"),
    },
  ];

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        badge="Lokalni tim od poverenja"
        breadcrumbs={[
          { label: tNav("home"), href: "/" },
          { label: tNav("about") },
        ]}
      />

      {/* Story section */}
      <section className="py-16 sm:py-24 bg-card border-b border-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Naša priča
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {t("storyTitle")}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("storyText")}
              </p>
              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                  <span>Komunikacija na srpskom, engleskom i nemačkom jeziku</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                  <span>Sopstvena baza proverenih majstora (hitne intervencije)</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                  <span>Sertifikovano sefovsko rukovanje ključevima</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-linear-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 border border-primary/20 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center mx-auto text-3xl font-black shadow-lg">
                  🏠
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Domovik Srbija
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Pouzdani čuvari i domaćini vaše nekretnine.
                </p>
                <div className="pt-2 border-t border-primary/20 flex items-center justify-center gap-2 text-xs font-semibold text-primary">
                  <MapPin className="w-4 h-4" />
                  <span>{tContact("serviceAreaVal")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Values */}
      <section className="py-16 sm:py-24 bg-background border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {t("valuesTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 hover:shadow-md transition-all flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title={tCta("title")}
        subtitle={tCta("subtitle")}
        buttonText={tCta("button")}
      />
    </>
  );
}

