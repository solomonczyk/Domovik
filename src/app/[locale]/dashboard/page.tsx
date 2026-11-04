import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import {
  ClipboardCheck,
  Calendar,
  MapPin,
  Camera,
  Play,
  FileText,
  PlusCircle,
  MessageCircle,
  Download,
  Sparkles,
  Droplets,
  Zap,
  ArrowRight,
} from "lucide-react";
import { getCurrentUser, getDocuments, getProperty, getVisits } from "@/lib/dal";

export default async function DashboardOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, user, property, visits, documents] = await Promise.all([
    getTranslations({ locale, namespace: "dashboard" }),
    getCurrentUser(),
    getProperty(),
    getVisits(),
    getDocuments(),
  ]);

  const latestVisit = visits[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Banner Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            {t("welcome")}, {user.firstName}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Vaš dom u Sremskoj Kamenici redovno obilazi naš tim. Poslednji pregled:{" "}
            <span className="font-semibold text-foreground">{latestVisit.date}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/requests"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-primary text-white hover:bg-primary-dark transition-all shadow-xs active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t("requestService")}</span>
          </Link>

          <a
            href="https://wa.me/381600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-xs active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Koordinator</span>
          </a>
        </div>
      </div>

      {/* Property Hero Card with Live Status */}
      <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Photo */}
          <div className="lg:col-span-5 relative h-64 lg:h-80 w-full bg-slate-900">
            <Image
              src={property.image}
              alt={property.name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              loading="eager"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white inline-flex items-center gap-1.5 shadow-xs mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                Objekat pod brigom
              </span>
              <h2 className="text-lg font-bold drop-shadow-md">{property.name}</h2>
              <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {property.address}
              </p>
            </div>
          </div>

          {/* Key Facts & Status Grid */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-2xl bg-muted/50 border border-border">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                  Aktivni paket
                </span>
                <span className="text-sm font-bold text-foreground block mt-1">
                  {property.plan}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-muted/50 border border-border">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                  Sledeći obilazak
                </span>
                <span className="text-sm font-bold text-emerald-600 block mt-1">
                  {property.nextVisit}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-muted/50 border border-border col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                  Dodatne usluge
                </span>
                <span className="text-sm font-bold text-foreground block mt-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Po dogovoru
                </span>
              </div>
            </div>

            {/* Live Telemetry Bar */}
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{t("allSecure")}</p>
                  <p className="text-[11px] text-muted-foreground">
                    Poslednji pregled: {latestVisit.time} • GPS verifikovano
                  </p>
                </div>
              </div>

              <Link
                href={`/dashboard/visits/${latestVisit.id}`}
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>Pogledaj izveštaj</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column: Latest Visit Details & Meter Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left (8 cols): Latest Inspection Card */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Zapisnik poslednjeg obilaska ({latestVisit.date})
                </h3>
                <p className="text-xs text-muted-foreground">{latestVisit.inspector}</p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              Verifikovano
            </span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {latestVisit.summary}
          </p>

          {/* Inspection Photos Showcase */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
              <Camera className="w-4 h-4" />
              <span>Fotografije sa GPS žigom ({latestVisit.photos.length} od {latestVisit.photosCount})</span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {latestVisit.photos.map((photo, index) => (
                <div key={index} className="group relative rounded-2xl overflow-hidden aspect-4/3 bg-slate-900 border border-border shadow-xs">
                  <Image
                    src={photo.url}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-2 left-2 right-2 text-white text-[10px]">
                    <p className="font-semibold truncate">{photo.caption}</p>
                    <p className="text-slate-300 font-mono text-[9px]">{photo.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href={`/dashboard/visits/${latestVisit.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-primary text-white hover:bg-primary-dark transition-all shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>Kompletan izveštaj sa svih {latestVisit.checklist.length} tačaka</span>
            </Link>

            <Link
              href={`/dashboard/visits/${latestVisit.id}#video`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-muted hover:bg-muted/80 text-foreground transition-colors"
            >
              <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>Video zapis ({latestVisit.videoDuration})</span>
            </Link>
          </div>
        </div>

        {/* Right (4 cols): Telemetry & Documents Quick Access */}
        <div className="lg:col-span-4 space-y-6">
          {/* Meter Readings Card */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-md space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Očitavanja instalacija</span>
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Droplets className="w-5 h-5 text-cyan-600" />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-muted-foreground block">
                      Vodomer
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      {latestVisit.meters.water}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase text-cyan-700 bg-cyan-500/20 px-2 py-0.5 rounded-md">
                  Suvo
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Zap className="w-5 h-5 text-amber-600" />
                  <div>
                    <span className="text-[10px] font-bold uppercase text-muted-foreground block">
                      Strujomer
                    </span>
                    <span className="text-xs font-bold text-foreground font-mono">
                      {latestVisit.meters.electricity}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-500/20 px-2 py-0.5 rounded-md">
                  OK
                </span>
              </div>
            </div>
          </div>

          {/* Documents Quick Access */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>Dokumenti</span>
              </h3>
              <Link href="/dashboard/documents" className="text-xs font-bold text-primary hover:underline">
                Svi ({documents.length})
              </Link>
            </div>

            <div className="space-y-2.5">
              {documents.slice(0, 2).map((document) => (
                <div key={document.id} className="p-3 rounded-2xl bg-muted/40 border border-border flex items-center justify-between gap-2">
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-foreground truncate">{document.title}</p>
                    <p className="text-[10px] text-muted-foreground">{document.size} • {document.date}</p>
                  </div>
                  <button
                    type="button"
                    className="p-1.5 rounded-xl bg-card hover:bg-muted text-foreground border border-border shrink-0 cursor-pointer"
                    title="Preuzmi"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
