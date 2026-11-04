import { getTranslations } from "next-intl/server";
import { FileText, Download, FileCheck, KeyRound } from "lucide-react";
import { getDocuments, getProperty } from "@/lib/dal";

export default async function DashboardDocumentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, documents, property] = await Promise.all([
    getTranslations({ locale, namespace: "dashboard" }),
    getDocuments(),
    getProperty(),
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
          {t("documents")}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Pravna dokumentacija, overeni ugovori, zapisnici i računi.
        </p>
      </div>

      {/* Contract highlight box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-1 inline-block">
              Pravno važeći ugovor
            </span>
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              Ugovor o redovnim obilascima i održavanju nepokretnosti #DOM-2026-084
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Objekat: {property.address} • Zaključen na neodređeno vreme uz otkazni rok od 30 dana.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-primary text-white hover:bg-primary-dark transition-all shrink-0 cursor-pointer shadow-xs active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Preuzmi ugovor (PDF)</span>
        </button>
      </div>

      {/* Vault Key Certificate */}
      <div className="p-6 rounded-3xl bg-card border border-border shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Zapisnik o preuzimanju ključeva
            </h3>
            <p className="text-xs text-muted-foreground">
              Ključevi se čuvaju po dogovoru i evidentiraju u skladu sa ugovorom.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs border border-border hover:bg-muted text-foreground transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Zapisnik (PDF)</span>
        </button>
      </div>

      {/* Documents Table */}
      <div className="rounded-3xl bg-card border border-border shadow-md overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Svi dokumenti i računi
          </h3>
        </div>

        <div className="divide-y divide-border">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-muted text-foreground flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{doc.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span className="font-semibold text-emerald-600">{doc.status}</span>
                    <span>•</span>
                    <span>{doc.date}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px]">{doc.size}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-border hover:bg-muted text-foreground transition-colors self-start sm:self-auto cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Preuzmi</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

