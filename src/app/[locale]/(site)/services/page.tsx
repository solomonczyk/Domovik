import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/PageHero";
import { ServicesGrid } from "@/components/landing/ServicesGrid";
import { AdditionalServices } from "@/components/landing/AdditionalServices";
import { PricingCards } from "@/components/landing/PricingCards";
import { CTASection } from "@/components/shared/CTASection";
import { ShieldCheck, FileCheck, CheckCircle2 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "servicesPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCta = await getTranslations({ locale, namespace: "cta" });

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        badge="Paketi i usluge"
        breadcrumbs={[
          { label: tNav("home"), href: "/" },
          { label: tNav("services") },
        ]}
      />

      {/* Intro info box */}
      <section className="py-12 bg-card border-b border-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-primary/5 border border-primary/20 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {t("introTitle")}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {t("introText")}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-primary">
              <FileCheck className="w-4 h-4" />
              <span>Sve usluge se pružaju isključivo na osnovu pismenog ugovora.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Standard visit checklist */}
      <ServicesGrid locale={locale} />

      {/* Optional add-ons */}
      <AdditionalServices locale={locale} />

      {/* Pricing cards */}
      <PricingCards />

      {/* Short-term rental notice card */}
      <section className="py-12 bg-background border-b border-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-secondary/5 border border-secondary/20">
            <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-secondary" />
              Poseban režim za stanove na dan (Airbnb / Booking)
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Radi poštovanja privatnosti vaših gostiju, unutrašnje kamere i fizički ulasci se ne vrše dok gosti borave u objektu. Nadzor se vrši isključivo u terminima primopredaje i pauze između rezervacija: inspekcija eventualnih oštećenja, provera slavina, klima uređaja, brojača i priprema za sledećeg gosta.
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

