"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {
  ShieldCheck,
  Menu,
  X,
  PhoneCall,
  User,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Single-page navigation links
  const navLinks = [
    { href: "/#servis", label: t("services") },
    { href: "/#3d-skener", label: t("skener"), badge: "3D" },
    { href: "/#bento", label: t("protection") },
    { href: "/#poredjenje", label: t("comparison") },
    { href: "/#pricing", label: t("pricing") },
    { href: "/#faq", label: t("faq") },
    { href: "/#contact", label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 print:hidden",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-xs py-2.5"
          : "bg-background/70 backdrop-blur-xs py-3.5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-transform active:scale-95 shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-foreground flex items-center gap-1">
                Domovik
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground -mt-1">
                Property Care
              </span>
            </div>
          </Link>

          {/* Desktop Single-Page Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors flex items-center gap-1.5"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 rounded-md bg-cyan-500/10 text-cyan-600 text-[9px] font-black uppercase font-mono">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <LanguageSwitcher />

            {/* Direct Client Portal Entry Button */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-muted hover:bg-muted/80 text-foreground border border-border transition-all active:scale-95 shadow-xs"
            >
              <User className="w-3.5 h-3.5 text-primary" />
              <span>{t("dashboard")}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-dark transition-all shadow-md active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t("requestQuote")}</span>
            </Link>
          </div>

          {/* Mobile hamburger & buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageSwitcher />

            <Link
              href="/dashboard"
              className="p-2 rounded-xl bg-muted text-foreground border border-border"
              title="Moj Nalog"
            >
              <User className="w-4 h-4 text-primary" />
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-b border-border bg-background/95 backdrop-blur-md animate-in slide-in-from-top-4 duration-200">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 text-[10px] font-mono font-bold">
                      {link.badge}
                    </span>
                  )}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}

            <div className="pt-3 border-t border-border mt-3 space-y-2">
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
              >
                <User className="w-4 h-4" />
                <span>{t("dashboard")} (Klijentski portal)</span>
              </Link>

              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary-dark"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t("requestQuote")}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
