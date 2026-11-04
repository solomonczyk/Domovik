import { Link } from "@/i18n/routing";
import { ChevronRight, Home } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHero({ title, subtitle, badge, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/10 via-background to-background pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-border/60">
      <div className="absolute inset-0 bg-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-muted-foreground/60" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-foreground transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </div>
            ))}
          </nav>
        )}

        <div className="max-w-3xl">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
              {badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

