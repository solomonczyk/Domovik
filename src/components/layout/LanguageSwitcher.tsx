"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "sr", label: "Srpski", flag: "🇷🇸" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "hu", label: "Magyar", flag: "🇭🇺" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
] as const;

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (nextLocale: string) => {
    setIsOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname as any, { locale: nextLocale as any });
  };

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-border bg-card text-card-foreground hover:bg-muted transition-colors shadow-xs"
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className="uppercase tracking-wider">{currentLang.code}</span>
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl bg-card border border-border shadow-lg py-1.5 z-50 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 border-b border-border/50 mb-1">
            <Globe className="w-3 h-3" /> Jezik / Language
          </div>
          {languages.map((lang) => {
            const isSelected = lang.code === locale;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={cn(
                  "w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors",
                  isSelected
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
                <span className="uppercase text-[10px] font-mono text-muted-foreground">{lang.code}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

