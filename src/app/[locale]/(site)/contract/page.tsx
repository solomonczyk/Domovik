import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { FileText, ShieldAlert, Download, Lock, Eye, AlertOctagon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contractPage" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ContractPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contractPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCta = await getTranslations({ locale, namespace: "cta" });

  const pillars = [
    {
      icon: Eye,
      title: t("pillars.0.title"),
      desc: t("pillars.0.desc"),
      color: "border-primary/30 bg-primary/5",
    },
    {
      icon: AlertOctagon,
      title: t("pillars.1.title"),
      desc: t("pillars.1.desc"),
      color: "border-amber-500/30 bg-amber-500/5",
    },
    {
      icon: Lock,
      title: t("pillars.2.title"),
      desc: t("pillars.2.desc"),
      color: "border-emerald-500/30 bg-emerald-500/5",
    },
    {
      icon: FileText,
      title: t("pillars.3.title"),
      desc: t("pillars.3.desc"),
      color: "border-indigo-500/30 bg-indigo-500/5",
    },
  ];

  const emergencySteps = [
    t("emergencySteps.0"),
    t("emergencySteps.1"),
    t("emergencySteps.2"),
    t("emergencySteps.3"),
    t("emergencySteps.4"),
  ];

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        badge="Pravna sigurnost"
        breadcrumbs={[
          { label: tNav("home"), href: "/" },
          { label: tNav("contract") },
        ]}
      />

      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Intro text */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
              Isključivo pisani ugovor sa jasnim odredbama
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t("intro")}
            </p>
          </div>

          {/* 4 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 rounded-3xl border ${item.color} shadow-xs space-y-3`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center text-foreground shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Emergency protocol */}
          <div className="p-6 sm:p-10 rounded-3xl bg-linear-to-br from-rose-500/10 via-amber-500/5 to-transparent border border-rose-500/20 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
                {t("emergencyTitle")}
              </h3>
            </div>

            <div className="space-y-4">
              {emergencySteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5 text-sm sm:text-base text-foreground/90">
                  <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-rose-500/20 text-xs text-muted-foreground leading-relaxed">
              * Granice odgovornosti: Domovik odgovara za savesno i ugovoreno vršenje dužnosti nadzora. Nismo ovlašćeno oružano obezbeđenje i ne garantujemo fizičko sprečavanje delovanja trećih lica, ali garantujemo ranu detekciju, uzbunjivanje vlasnika i hitan poziv nadležnim organima.
            </div>
          </div>

          {/* Download Sample Contract Card */}
          <div className="p-8 rounded-3xl bg-card border border-border shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2">
                <FileText className="w-5 h-5 text-primary" />
                {t("downloadTitle")}
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">
                {t("downloadDesc")}
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary-dark transition-all shadow-md shrink-0 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{t("downloadBtn")}</span>
            </a>
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

