import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/landing/HeroSection";
import { House3DViewer } from "@/components/landing/House3DViewer";
import { ServicesGrid } from "@/components/landing/ServicesGrid";
import { BeforeAfterInspection } from "@/components/landing/BeforeAfterInspection";
import { BentoServices } from "@/components/landing/BentoServices";
import { InspectionReportDemo } from "@/components/landing/InspectionReportDemo";
import { AdditionalServices } from "@/components/landing/AdditionalServices";
import { TargetAudience } from "@/components/landing/TargetAudience";
import { TrustBlock } from "@/components/landing/TrustBlock";
import { PricingCards } from "@/components/landing/PricingCards";
import { FAQ } from "@/components/landing/FAQ";
import { ContactForm } from "@/components/landing/ContactForm";
import { ContactInfo } from "@/components/landing/ContactInfo";
import { CTASection } from "@/components/shared/CTASection";
import { getTranslations } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tCta = await getTranslations({ locale, namespace: "cta" });

  return (
    <>
      {/* 1. Cinematic Hero with 3D Tilt Card & Live Telemetry Ticker */}
      <HeroSection />

      {/* 2. Interactive 3D House Security & Utility Inspection Model */}
      <House3DViewer />

      {/* 3. Standard Protocol with Photo Visuals */}
      <div id="servis">
        <ServicesGrid locale={locale} />
      </div>

      {/* 4. Interactive Drag Comparison Slider: Before vs After Domovik Care */}
      <BeforeAfterInspection />

      {/* 5. Bento Grid Layout: Vault Key Storage, Live Meters, Video */}
      <BentoServices />

      {/* 6. Realistic Phone Mockup: What the Client Actually Sees on WhatsApp */}
      <InspectionReportDemo />

      {/* 7. Additional Services with Real Imagery */}
      <AdditionalServices locale={locale} />

      {/* 8. Target Audience Cards */}
      <TargetAudience locale={locale} />

      {/* 9. Trust Pillars & Written Contract */}
      <TrustBlock locale={locale} />

      {/* 10. Interactive Pricing with Monthly/Annual -15% Toggle */}
      <PricingCards />

      {/* 11. FAQ Accordion */}
      <div id="faq">
        <FAQ />
      </div>

      {/* 12. Direct Contact & Lead Form (2-Columns) */}
      <section className="py-20 sm:py-28 bg-background border-t border-border/60" id="contact">
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

      {/* 13. Final CTA Banner */}
      <CTASection
        title={tCta("title")}
        subtitle={tCta("subtitle")}
        buttonText={tCta("button")}
      />
    </>
  );
}
