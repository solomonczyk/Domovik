import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  ArrowLeft,
  Clock,
  MapPin,
  User,
  Camera,
  Play,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Droplets,
  Zap,
  FileText,
} from "lucide-react";
import { PrintButton } from "@/components/dashboard/PrintButton";
import { getProperty, getVisit } from "@/lib/dal";
import {
  checklistCategoryLabels,
  checklistCategoryOrder,
  getVisitIssues,
} from "@/lib/report";
import type { InspectionItem } from "@/lib/demoData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const visit = await getVisit(id);

  return {
    title: visit ? `Izveštaj ${visit.id}` : "Izveštaj o obilasku",
  };
}

function StatusIcon({ status }: { status: InspectionItem["status"] }) {
  if (status === "issue") {
    return <XCircle className="w-4 h-4 text-rose-600" />;
  }

  if (status === "warning") {
    return <AlertTriangle className="w-4 h-4 text-amber-600" />;
  }

  return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
}

const statusLabels: Record<InspectionItem["status"], string> = {
  ok: "U redu",
  warning: "Napomena",
  issue: "Problem",
};

const statusStyles: Record<InspectionItem["status"], string> = {
  ok: "bg-emerald-500/10 border-emerald-500/20",
  warning: "bg-amber-500/10 border-amber-500/20",
  issue: "bg-rose-500/10 border-rose-500/20",
};

export default async function VisitReportPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const [property, visit] = await Promise.all([getProperty(), getVisit(id)]);

  if (!visit) {
    notFound();
  }

  const issues = getVisitIssues(visit);
  const secure = issues.length === 0;
  const groupedChecklist = checklistCategoryOrder
    .map((category) => ({
      category,
      items: visit.checklist.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <article className="max-w-5xl mx-auto space-y-6 print:max-w-none print:space-y-4">
      {/* Navigation / actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
        <Link
          href="/dashboard/visits"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Nazad na istoriju obilazaka</span>
        </Link>

        <div className="flex items-center gap-2">
          <PrintButton />
        </div>
      </div>

      {/* Print-only letterhead */}
      <div className="hidden print:block border-b-2 border-slate-800 pb-4 mb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-black tracking-tight">Domovik.</p>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Klijentski portal • Izveštaj o obilasku
            </p>
          </div>
          <div className="text-right text-[10px] text-slate-600">
            <p className="font-mono font-bold">{visit.id}</p>
            <p>{visit.date}</p>
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-700">
          <p className="font-bold">{property.name}</p>
          <p>{property.address}</p>
        </div>
      </div>

      {/* Report header */}
      <header className="rounded-3xl bg-card border border-border shadow-md p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              Izveštaj o redovnom obilasku
            </p>
            <div className="flex flex-wrap items-center gap-2.5 mt-1">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                {visit.date}
              </h1>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                  secure
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                }`}
              >
                {secure ? "Bezbedno • Verifikovano" : `Odstupanja: ${issues.length}`}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {property.name} • {property.address}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
              ID izveštaja
            </p>
            <p className="text-sm font-mono font-bold text-foreground">{visit.id}</p>
            <p className="text-[11px] text-muted-foreground mt-1">Verifikovan izveštaj</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-muted/50 border border-border">
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Vreme obilaska
            </p>
            <p className="text-xs font-bold text-foreground mt-1">{visit.time}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-muted/50 border border-border">
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Koordinator
            </p>
            <p className="text-xs font-bold text-foreground mt-1">{visit.inspector}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-muted/50 border border-border">
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> GPS verifikacija
            </p>
            <p className="text-xs font-bold font-mono text-emerald-600 mt-1">{visit.gps}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-muted/50 border border-border">
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5" /> Video zapis
            </p>
            <p className="text-xs font-bold text-foreground mt-1">{visit.videoDuration}</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-1.5">
            Sažetak obilaska
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed">{visit.summary}</p>
        </div>
      </header>

      {/* Security verdict */}
      <div
        className={`rounded-2xl border p-5 flex items-start gap-4 ${
          secure
            ? "bg-emerald-500/10 border-emerald-500/25"
            : "bg-amber-500/10 border-amber-500/25"
        }`}
      >
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
            secure
              ? "bg-emerald-600 text-white"
              : "bg-amber-500 text-white"
          }`}
        >
          {secure ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground">
            {secure
              ? "Objekat je bezbedan. Nisu pronađena odstupanja."
              : `Pronađeno je ${issues.length} odstupanja tokom obilaska.`}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {secure
              ? `Svih ${visit.checklist.length} tačaka protokola je provereno i evidentirano foto i video dokumentacijom.`
              : "Sva odstupanja su dokumentovana i klijent je obavešten u skladu sa protokolom."}
          </p>
        </div>
      </div>

      {/* Issues list */}
      {issues.length > 0 && (
        <section className="rounded-3xl bg-card border border-border shadow-md p-6 sm:p-8 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Prijavljena odstupanja</span>
          </h2>
          <div className="space-y-2.5">
            {issues.map((item, index) => (
              <div
                key={index}
                className={`p-3.5 rounded-xl border flex items-start gap-3 ${statusStyles[item.status]}`}
              >
                <StatusIcon status={item.status} />
                <div>
                  <p className="text-xs font-bold text-foreground">{item.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {statusLabels[item.status]}
                    {item.note ? ` • ${item.note}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Photo documentation */}
      <section className="rounded-3xl bg-card border border-border shadow-md p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Camera className="w-4 h-4 text-primary" />
            <span>Fotodokumentacija</span>
          </h2>
          <p className="text-[11px] text-muted-foreground">
            Prikazano {visit.photos.length} od {visit.photosCount} fotografija • sve sa GPS žigom
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visit.photos.map((photo, index) => (
            <figure
              key={index}
              className="relative rounded-2xl overflow-hidden bg-slate-900 border border-border aspect-4/3"
            >
              <Image
                src={photo.url}
                alt={photo.caption}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs font-semibold">{photo.caption}</p>
                <p className="text-[10px] text-slate-300 font-mono">{photo.timestamp}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Utility readings */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-3xl bg-card border border-border shadow-md p-6 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Droplets className="w-4 h-4 text-cyan-600" />
            Vodomer
          </p>
          <p className="text-lg font-black font-mono text-foreground">{visit.meters.water}</p>
          <p className="text-[11px] text-muted-foreground">Očitano i fotografisano tokom obilaska.</p>
        </div>

        <div className="rounded-3xl bg-card border border-border shadow-md p-6 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600" />
            Strujomer
          </p>
          <p className="text-lg font-black font-mono text-foreground">{visit.meters.electricity}</p>
          <p className="text-[11px] text-muted-foreground">Provereno napajanje i rad obaveznih uređaja.</p>
        </div>
      </section>

      {/* Video archive */}
      <section
        id="video"
        className="rounded-3xl bg-slate-950 text-white p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-5"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <Play className="w-6 h-6 fill-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
              Video zapis obilaska
            </p>
            <h2 className="text-base font-bold mt-0.5">
              Kontinuirani snimak celog obilaska • {visit.videoDuration}
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Snimak se čuva 90 dana u zaštićenom arhivu i dostupan je pouzećem na zahtev.
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Zaštićen pristup
        </span>
      </section>

      {/* Full checklist */}
      <section className="rounded-3xl bg-card border border-border shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span>Rezultati kontrolne liste</span>
          </h2>
          <p className="text-[11px] text-muted-foreground">
            {visit.checklist.length} proverenih tačaka
          </p>
        </div>

        <div className="space-y-6">
          {groupedChecklist.map((group) => (
            <div key={group.category} className="space-y-2.5">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">
                {checklistCategoryLabels[group.category]}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {group.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-muted/40 border border-border flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <StatusIcon status={item.status} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground leading-tight">
                        {item.name}
                      </p>
                      {item.note && (
                        <p className="text-[11px] text-primary font-medium mt-0.5">
                          💬 {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <p>
            Izveštaj generisan automatski iz sistema Domovik • GPS i vremenski žig verifikovani.
          </p>
          <p className="font-mono font-bold text-foreground">{visit.id}</p>
        </div>
      </section>
    </article>
  );
}
