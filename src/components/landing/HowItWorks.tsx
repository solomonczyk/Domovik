import { getTranslations } from "next-intl/server";
import { ClipboardList, CalendarCheck, Home, FileCheck, ArrowRight } from "lucide-react";

export async function HowItWorks({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "howItWorks" });

  const steps = [
    {
      num: "01",
      icon: ClipboardList,
      title: t("step1Title"),
      desc: t("step1Desc"),
    },
    {
      num: "02",
      icon: CalendarCheck,
      title: t("step2Title"),
      desc: t("step2Desc"),
    },
    {
      num: "03",
      icon: Home,
      title: t("step3Title"),
      desc: t("step3Desc"),
    },
    {
      num: "04",
      icon: FileCheck,
      title: t("step4Title"),
      desc: t("step4Desc"),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-card border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col p-6 rounded-2xl bg-background border border-border hover:border-primary/40 hover:shadow-md transition-all group"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-muted-foreground/30 font-mono">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>

                {/* Arrow indicator between steps for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-muted-foreground/40">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

