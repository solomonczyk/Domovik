"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Calendar,
  Sparkles,
  Trees,
  HeartHandshake,
  Flower2,
  Wind,
  KeyRound,
  CheckCircle2,
  Send,
  AlertCircle,
} from "lucide-react";

export default function DashboardRequestsPage() {
  const t = useTranslations("dashboard");
  const [selectedService, setSelectedService] = useState("prepareArrival");
  const [date, setDate] = useState("2026-11-20");
  const [urgency, setUrgency] = useState("standard");
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const services = [
    { id: "prepareArrival", name: "Priprema kuće pred dolazak (grejanje, bojler, provetravanje)", icon: KeyRound },
    { id: "cleaning", name: "Generalno ili periodično čišćenje", icon: Sparkles },
    { id: "yardCare", name: "Košenje trave i održavanje dvorišta", icon: Trees },
    { id: "stormCheck", name: "Vanredni pregled nakon nevremena", icon: Wind },
    { id: "plantWatering", name: "Dodatno zalivanje sobnih biljaka", icon: Flower2 },
    { id: "petCare", name: "Briga i hranjenje ljubimaca", icon: HeartHandshake },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: selectedService,
          date,
          urgency,
          note: note.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Slanje zahteva nije uspelo.");
      }

      setIsSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Slanje zahteva nije uspelo. Pokušajte ponovo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
          {t("requestService")}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Zatražite dodatnu ili vanrednu uslugu za vašu nekretninu. Naš tim će potvrditi termin i cenu u roku od nekoliko sati.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-4 animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            {t("requestSuccess")}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Zahtev je prosleđen vašem koordinatoru Nikoli Petroviću. Dobićete potvrdu termina i kalkulaciju na WhatsApp.
          </p>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setError(null);
            }}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            Pošalji još jedan zahtev
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-md space-y-6">
          {/* Service picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Izaberite uslugu
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((srv) => {
                const Icon = srv.icon;
                const isSelected = selectedService === srv.id;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedService(srv.id)}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary/10 border-primary text-foreground shadow-xs ring-2 ring-primary/20"
                        : "bg-background border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">{srv.name}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Željeni datum realizacije
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Hitnost zahteva
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
              >
                <option value="standard">Standardno (u narednih 3-5 dana)</option>
                <option value="urgent">Hitno (u roku od 24 časa)</option>
                <option value="scheduled">Planirano za tačan datum dolaska</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Posebna uputstva ili napomena
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Npr. Molimo da uključite podno grejanje na 22°C i kupite flaširanu vodu i kafu pre našeg dolaska..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-xs text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-primary hover:bg-primary-dark text-white transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span>Slanje zahteva...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Pošalji zahtev koordinatoru</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

