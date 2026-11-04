"use client";

import { ReactNode, useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { logoutAction } from "@/app/actions/auth";
import {
  ShieldCheck,
  LayoutDashboard,
  CalendarCheck,
  FileText,
  PlusCircle,
  Home,
  LogOut,
  Menu,
  X,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  user: {
    name: string;
    initials: string;
    location: string;
  };
  property: {
    name: string;
    city: string;
  };
  children: ReactNode;
}

export function DashboardShell({ user, property, children }: DashboardShellProps) {
  const t = useTranslations("dashboard");
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navigation = [
    { name: "Pregled stanja", href: "/dashboard", icon: LayoutDashboard },
    { name: t("visitHistory"), href: "/dashboard/visits", icon: CalendarCheck },
    { name: t("documents"), href: "/dashboard/documents", icon: FileText },
    { name: t("requestService"), href: "/dashboard/requests", icon: PlusCircle },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex print:hidden flex-col w-72 bg-card border-r border-border shrink-0">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-foreground flex items-center gap-1">
                Domovik<span className="text-emerald-500">.</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 block -mt-1">
                Klijentski Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Property Selector Card */}
        <div className="p-4 mx-4 my-4 rounded-2xl bg-muted/60 border border-border">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
            <span>Aktivna nekretnina</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-xs font-bold text-foreground truncate">{property.name}</p>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1 truncate mt-0.5">
            <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
            {property.city}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 py-2">
          {navigation.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all",
                  active
                    ? "bg-primary text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-border space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Povratak na javni sajt</span>
            <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>{t("logout")}</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 print:hidden bg-card border-b border-border flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-xl border border-border text-foreground hover:bg-muted"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Redovni obilasci</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <div className="h-6 w-px bg-border mx-1" />

            {/* User profile pill */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center border border-primary/20">
                {user.initials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-foreground leading-tight">{user.name}</p>
                <p className="text-[10px] text-muted-foreground font-medium">{user.location}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden bg-card border-b border-border p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold",
                  isActive(item.href)
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-2 space-y-1">
              <Link
                href="/"
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground"
              >
                <Home className="w-4 h-4" />
                <span>Javni sajt</span>
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 rounded-xl text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t("logout")}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto print:overflow-visible print:p-0">
          {children}
        </main>
      </div>
    </div>
  );
}
