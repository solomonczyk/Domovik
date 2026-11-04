"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-primary text-white hover:bg-primary-dark transition-all shadow-xs active:scale-95 cursor-pointer print:hidden"
    >
      <Printer className="w-4 h-4" />
      <span>Štampaj / sačuvaj kao PDF</span>
    </button>
  );
}
