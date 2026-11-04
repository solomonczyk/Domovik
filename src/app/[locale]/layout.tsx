import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Manrope, Onest } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      template: "%s | Domovik",
      default: t("title"),
    },
    description: t("description"),
    metadataBase: new URL("https://domovik.rs"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: "Domovik",
      locale: locale === "sr" ? "sr_RS" : locale,
      type: "website",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        sr: "/sr",
        en: "/en",
        de: "/de",
        hu: "/hu",
        ru: "/ru",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${manrope.variable} ${onest.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
