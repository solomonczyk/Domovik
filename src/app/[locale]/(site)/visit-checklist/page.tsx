import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { Video, ShieldCheck, CheckCircle2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "visitChecklist" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function VisitChecklistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "visitChecklist" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCta = await getTranslations({ locale, namespace: "cta" });

  const steps = [
    { title: t("steps.0.title"), desc: t("steps.0.desc") },
    { title: t("steps.1.title"), desc: t("steps.1.desc") },
    { title: t("steps.2.title"), desc: t("steps.2.desc") },
    { title: t("steps.3.title"), desc: t("steps.3.desc") },
    { title: t("steps.4.title"), desc: t("steps.4.desc") },
    { title: t("steps.5.title"), desc: t("steps.5.desc") },
    { title: t("steps.6.title"), desc: t("steps.6.desc") },
    { title: t("steps.7.title"), desc: t("steps.7.desc") },
    { title: t("steps.8.title"), desc: t("steps.8.desc") },
    { title: t("steps.9.title"), desc: t("steps.9.desc") },
    { title: t("steps.10.title"), desc: t("steps.10.desc") },
    { title: t("steps.11.title"), desc: t("steps.11.desc") },
    { title: t("steps.12.title"), desc: t("steps.12.desc") },
    { title: t("steps.13.title"), desc: t("steps.13.desc") },
    { title: t("steps.14.title"), desc: t("steps.14.desc") },
  ];

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        badge="Transparentnost na delu"
        breadcrumbs={[
          { label: tNav("home"), href: "/" },
          { label: tNav("visitChecklist") },
        ]}
      />

      {/* Video & archive notice box */}
      <section className="py-8 bg-card border-b border-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start sm:items-center gap-4 p-5 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <Video className="w-6 h-6 shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-sm font-medium leading-relaxed">
              {t("notice")}
            </p>
          </div>
        </div>
      </section>

      {/* 15 Steps Timeline */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 sm:before:left-7 before:w-0.5 before:bg-border before:pointer-events-none">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative flex items-start gap-4 sm:gap-6 group"
              >
                {/* Step indicator bubble */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-card border-2 border-primary text-primary font-black text-sm sm:text-base flex items-center justify-center shrink-0 shadow-sm z-10 group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all">
                  {idx + 1}
                </div>

                {/* Step content card */}
                <div className="flex-1 p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/40 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {step.title}
                    </h3>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 p-6 rounded-3xl bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
            <p className="text-sm text-foreground font-medium">
              Svi podaci, video zapisi i fotografije sa geolokacijom pohranjuju se na zaštićenom evropskom serveru sa enkripcijom.
            </p>
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

