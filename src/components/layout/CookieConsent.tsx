"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Shield, Cookie, X, Check, SlidersHorizontal } from "lucide-react";

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
}

const STORAGE_KEY = "domovik_cookie_consent";

const DEFAULT_SETTINGS: CookieSettings = {
  necessary: true,
  analytics: true,
  preferences: true,
};

function readStoredSettings(): CookieSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function CookieConsent() {
  const t = useTranslations("cookies");
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(readStoredSettings);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!stored) {
      // Show banner after brief delay for smooth impression
      timer = setTimeout(() => setIsOpen(true), 1200);
    }

    // Listen for custom event to reopen settings anytime
    const handleOpen = () => {
      setIsModalOpen(true);
    };
    window.addEventListener("open-cookie-settings", handleOpen);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("open-cookie-settings", handleOpen);
    };
  }, []);

  const savePreferences = (updated: CookieSettings) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Set cookie for server-side awareness if needed
    document.cookie = `${STORAGE_KEY}=${updated.analytics ? "all" : "necessary"}; path=/; max-age=31536000; SameSite=Lax`;
    setSettings(updated);
    setIsOpen(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => {
    savePreferences({ necessary: true, analytics: true, preferences: true });
  };

  const handleNecessaryOnly = () => {
    savePreferences({ necessary: true, analytics: false, preferences: false });
  };

  const handleSaveModal = () => {
    savePreferences(settings);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating Bottom Banner */}
      {isOpen && !isModalOpen && (
        <div className="fixed bottom-0 left-0 right-0 sm:bottom-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-8 duration-500 print:hidden">
          <div className="p-4 sm:p-5 rounded-t-3xl sm:rounded-3xl glass-panel bg-card/95 border border-border shadow-2xl backdrop-blur-xl relative overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-secondary to-accent" />

            <div className="flex items-start gap-3">
              <div className="hidden sm:flex w-9 h-9 rounded-2xl bg-primary/10 text-primary items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="flex-1 pr-1">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  {t("title")}
                </h4>
                <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground leading-snug line-clamp-3 sm:line-clamp-none">
                  {t("description")}
                </p>
              </div>
              <button
                type="button"
                onClick={handleNecessaryOnly}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-border/60">
              <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-2.5 sm:px-3 py-2 rounded-xl text-[11px] sm:text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
                  <span>{t("settings")}</span>
                </button>

                <button
                  type="button"
                  onClick={handleNecessaryOnly}
                  className="px-2.5 sm:px-3 py-2 rounded-xl text-[11px] sm:text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition-colors whitespace-nowrap"
                >
                  {t("necessaryOnly")}
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold bg-primary text-white hover:bg-primary-dark transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                  {t("acceptAll")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 print:hidden">
          <div className="w-full max-w-lg rounded-3xl bg-card border border-border shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{t("title")}</h3>
                  <p className="text-xs text-muted-foreground">GDPR & ePrivacy Compliant</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {/* Necessary */}
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-foreground flex items-center gap-2">
                    {t("necessaryTitle")}
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold">
                      Uvek aktivno
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {t("necessaryDesc")}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              </div>

              {/* Analytics */}
              <div className="p-4 rounded-2xl bg-card border border-border flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-foreground">{t("analyticsTitle")}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {t("analyticsDesc")}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={settings.analytics}
                    onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Preferences */}
              <div className="p-4 rounded-2xl bg-card border border-border flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-foreground">{t("preferencesTitle")}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {t("preferencesDesc")}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={settings.preferences}
                    onChange={(e) => setSettings({ ...settings, preferences: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleNecessaryOnly}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition-colors"
              >
                {t("necessaryOnly")}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveModal}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-border hover:bg-muted text-foreground transition-colors"
                >
                  {t("save")}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-dark transition-all shadow-md active:scale-95"
                >
                  {t("acceptAll")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

