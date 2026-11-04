import type { InspectionItem, VisitRecord } from "./demoData";

export const checklistCategoryLabels: Record<InspectionItem["category"], string> = {
  exterior: "Spoljašnjost i perimetar",
  interior: "Unutrašnjost",
  utilities: "Instalacije",
  security: "Bezbednost i protokol",
};

export const checklistCategoryOrder: InspectionItem["category"][] = [
  "security",
  "exterior",
  "utilities",
  "interior",
];

export function getVisitIssues(visit: VisitRecord) {
  return visit.checklist.filter((item) => item.status !== "ok");
}

export function isVisitSecure(visit: VisitRecord) {
  return getVisitIssues(visit).length === 0;
}
