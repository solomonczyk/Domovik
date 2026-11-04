import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ScrollProgress } from "@/components/ui/Reveal";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
