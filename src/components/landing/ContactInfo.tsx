import { getTranslations } from "next-intl/server";
import { Phone, Mail, Clock, MapPin, MessageCircle, PhoneCall, ShieldAlert } from "lucide-react";

export async function ContactInfo({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
          {t("title")}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {t("subtitle")}
        </p>
      </div>

      {/* Quick messaging buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href="https://wa.me/381600000000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">WhatsApp</p>
            <p className="text-sm font-bold text-foreground">{t("whatsapp")}</p>
          </div>
        </a>

        <a
          href="viber://chat?number=%2B381600000000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Viber</p>
            <p className="text-sm font-bold text-foreground">{t("viber")}</p>
          </div>
        </a>
      </div>

      {/* Contact Cards */}
      <div className="space-y-3">
        <a
          href={`tel:${t("phoneVal").replace(/\s+/g, "")}`}
          className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xs transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("phone")}</p>
            <p className="text-base font-bold text-foreground mt-0.5">{t("phoneVal")}</p>
          </div>
        </a>

        <a
          href={`mailto:${t("emailVal")}`}
          className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xs transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("email")}</p>
            <p className="text-base font-bold text-foreground mt-0.5">{t("emailVal")}</p>
          </div>
        </a>

        <div className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("workingHours")}</p>
            <p className="text-sm font-semibold text-foreground mt-0.5 leading-relaxed">{t("workingHoursVal")}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("serviceArea")}</p>
            <p className="text-sm font-semibold text-foreground mt-0.5 leading-relaxed">{t("serviceAreaVal")}</p>
          </div>
        </div>
      </div>

      {/* Emergency notice */}
      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-foreground/80 leading-relaxed">
          {t.rich("emergencyNote", {
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      </div>
    </div>
  );
}

