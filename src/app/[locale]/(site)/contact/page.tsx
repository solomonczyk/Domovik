import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/landing/ContactForm";
import { ContactInfo } from "@/components/landing/ContactInfo";
import { FAQ } from "@/components/landing/FAQ";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contact" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        badge="Stupite u kontakt"
        breadcrumbs={[
          { label: tNav("home"), href: "/" },
          { label: tNav("contact") },
        ]}
      />

      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <ContactInfo locale={locale} />
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}

