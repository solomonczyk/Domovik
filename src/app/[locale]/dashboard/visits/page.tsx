import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import {
  Calendar,
  Clock,
  MapPin,
  Camera,
  FileText,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Play,
} from "lucide-react";
import { getProperty, getVisits } from "@/lib/dal";
import { getVisitIssues, isVisitSecure } from "@/lib/report";

export default async function DashboardVisitsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, property, visits] = await Promise.all([
    getTranslations({ locale, namespace: "dashboard" }),
    getProperty(),
    getVisits(),
  ]);

  const totalPhotos = visits.reduce((sum, visit) => sum + visit.photosCount, 0);
  const totalIncidents = visits.reduce(
    (sum, visit) => sum + getVisitIssues(visit).length,
    0
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
          {t("visitHistory")}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Svi arhivirani obilasci za objekat {property.name} — sa punim kontrolnim listama,
          originalnim fotografijama i video zapisima.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Ukupno obilazaka
            </p>
            <p className="text-xl font-black text-foreground">{visits.length}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center shrink-0">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Fotografija sa žigom
            </p>
            <p className="text-xl font-black text-foreground">{totalPhotos}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border shadow-xs flex items-center gap-4">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
              totalIncidents === 0
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-amber-500/10 text-amber-600"
            }`}
          >
            {totalIncidents === 0 ? (
              <ShieldCheck className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Prijavljeni incidenti
            </p>
            <p className="text-xl font-black text-foreground">{totalIncidents}</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {visits.map((visit) => {
          const secure = isVisitSecure(visit);
          const issues = getVisitIssues(visit);

          return (
            <article
              key={visit.id}
              className="rounded-3xl bg-card border border-border shadow-md overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="text-lg font-bold text-foreground">{visit.date}</h2>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                            secure
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                          }`}
                        >
                          {secure
                            ? "Završeno • U redu"
                            : `Završeno • ${issues.length} odstupanjâ`}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground flex flex-wrap items-center gap-2 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {visit.time}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono text-emerald-600">
                          <MapPin className="w-3.5 h-3.5" /> {visit.gps}
                        </span>
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Izveštaj: <span className="font-mono font-bold text-foreground">{visit.id}</span>{" "}
                        • {visit.inspector}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/visits/${visit.id}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-dark transition-colors self-start sm:self-auto shrink-0"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Otvori izveštaj</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed">{visit.summary}</p>

                {/* Photo strip */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div className="flex flex-wrap gap-3">
                    {visit.photos.slice(0, 4).map((photo, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-20 rounded-xl overflow-hidden bg-slate-900 border border-border"
                      >
                        <Image
                          src={photo.url}
                          alt={photo.caption}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                        <p className="absolute bottom-1 left-1.5 right-1.5 text-white text-[8px] font-mono truncate">
                          {photo.timestamp}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5" />
                      {visit.photosCount} fotografija
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                      Video {visit.videoDuration}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
