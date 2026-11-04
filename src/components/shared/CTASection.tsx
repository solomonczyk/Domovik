import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight, PhoneCall, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

interface CTASectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
}

export function CTASection({ title, subtitle, buttonText }: CTASectionProps) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-linear-to-br from-primary-700 via-primary-600 to-primary-dark text-white">
      <Image
        src="/images/serbia-town.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-15"
      />
      <div className="absolute inset-0 bg-primary-dark/35" />
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <Reveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
          {title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-primary-100 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-white text-primary-700 hover:bg-[#f7f2e9] transition-all shadow-lg hover:shadow-xl active:scale-95 text-base"
          >
            <PhoneCall className="w-5 h-5 text-primary-600" />
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>

          <a
            href="https://wa.me/381600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-md active:scale-95 text-base"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}

