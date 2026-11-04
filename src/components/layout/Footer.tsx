"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ShieldCheck, Mail, Phone, Clock, MapPin, Cookie, MessageCircle } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const tCookies = useTranslations("cookies");

  const currentYear = new Date().getFullYear();

  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent("open-cookie-settings"));
  };

  return (
    <footer className="bg-[#1b1410] text-[#f5ede3] border-t border-[#3a2a22]/80 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group inline-flex">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-primary-light to-primary text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Domovik
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block ml-0.5"></span>
              </span>
            </Link>
            <p className="text-sm text-[#b8a998] leading-relaxed">
              {t("description")}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#9a8878] pt-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>SRB • DE • EN • HU • RU</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t("navigation")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-[#b8a998] hover:text-white transition-colors">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#b8a998] hover:text-white transition-colors">
                  {tNav("services")}
                </Link>
              </li>
              <li>
                <Link href="/visit-checklist" className="text-[#b8a998] hover:text-white transition-colors">
                  {tNav("visitChecklist")}
                </Link>
              </li>
              <li>
                <Link href="/contract" className="text-[#b8a998] hover:text-white transition-colors">
                  {tNav("contract")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#b8a998] hover:text-white transition-colors">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#b8a998] hover:text-white transition-colors">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact details */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {tContact("title")}
            </h3>
            <ul className="space-y-3 text-sm text-[#b8a998]">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a href={`tel:${tContact("phoneVal").replace(/\s+/g, "")}`} className="hover:text-white transition-colors font-medium">
                  {tContact("phoneVal")}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <a href={`mailto:${tContact("emailVal")}`} className="hover:text-white transition-colors">
                  {tContact("emailVal")}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs">{tContact("workingHoursVal")}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="text-xs">{tContact("serviceAreaVal")}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Messaging & Cookies */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t("legalTitle")}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#b8a998] mb-6">
              <li>
                <Link href="/contract" className="hover:text-white transition-colors">
                  {tNav("contract")}
                </Link>
              </li>
              <li>
                <Link href="/visit-checklist" className="hover:text-white transition-colors">
                  {tNav("visitChecklist")}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="flex items-center gap-1.5 text-[#b8a998] hover:text-emerald-400 transition-colors text-left"
                >
                  <Cookie className="w-3.5 h-3.5" />
                  <span>{tCookies("manageCookies")}</span>
                </button>
              </li>
            </ul>

            <div className="p-4 rounded-2xl bg-[#241a15] border border-[#3a2a22]">
              <p className="text-xs text-[#e2d6c8] font-medium flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" /> {t("directLine")}
              </p>
              <a
                href="https://wa.me/381600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>{tContact("whatsapp")}</span> →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2b211c] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9a8878]">
          <p>© {currentYear} Domovik. {t("rights")}</p>
          <div className="flex items-center gap-6">
            <Link href="/contract" className="hover:text-[#b8a998] transition-colors">
              {t("terms")}
            </Link>
            <Link href="/contract" className="hover:text-[#b8a998] transition-colors">
              {t("privacy")}
            </Link>
            <button
              type="button"
              onClick={openCookiePreferences}
              className="hover:text-[#e2d6c8] transition-colors cursor-pointer"
            >
              {tCookies("manageCookies")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
