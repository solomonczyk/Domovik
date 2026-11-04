export interface InspectionItem {
  name: string;
  category: "exterior" | "interior" | "utilities" | "security";
  status: "ok" | "issue" | "warning";
  note?: string;
}

export interface VisitRecord {
  id: string;
  date: string;
  time: string;
  inspector: string;
  property: string;
  gps: string;
  status: "completed" | "scheduled";
  summary: string;
  photosCount: number;
  videoDuration: string;
  meters: {
    water: string;
    electricity: string;
  };
  photos: {
    url: string;
    caption: string;
    timestamp: string;
  }[];
  checklist: InspectionItem[];
}

export const demoClient = {
  id: "client-001",
  name: "Petar Petrović",
  email: "petar.dijaspora@gmail.com",
  location: "München, DE",
  phone: "+49 170 000 0000",
};

export const demoProperty = {
  id: "prop-01",
  name: "Porodična kuća sa dvorištem",
  address: "Liparski venac 18, Sremska Kamenica",
  city: "Novi Sad",
  type: "Kuća (220 m² + 8 ari dvorište)",
  plan: "Standard Plus (2x mesečno)",
  status: "Štićeni objekat — Aktivno",
  lastVisit: "03. Novembar 2026.",
  nextVisit: "17. Novembar 2026. (za 13 dana)",
  keySafeCode: "Sef #A-14 (Glavni depo)",
  image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85",
};

export const demoVisits: VisitRecord[] = [
  {
    id: "VST-2026-11-03",
    date: "03.11.2026.",
    time: "14:15 - 14:48 CET",
    inspector: "Nikola Petrović (Sertifikovani koordinator)",
    property: demoProperty.address,
    gps: "45.2238° N, 19.8451° E (GPS Verified)",
    status: "completed",
    summary: "Redovni bi-nedeljni obilazak. Spoljni i unutrašnji perimetar uredan. Nema tragova vlage ili pokušaja nasilnog ulaska. Slavine i glavni ventil vode bez curenja. Preuzeto 3 pisma iz sandučeta.",
    photosCount: 14,
    videoDuration: "03:45 min",
    meters: {
      water: "0142.8 m³ (nepromenjeno)",
      electricity: "14.820 kWh (frižider i alarm aktivni)",
    },
    photos: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        caption: "Fasada, oluci i prilazna staza",
        timestamp: "14:18:02 CET",
      },
      {
        url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
        caption: "Ulazna vrata i provera sigurnosne brave",
        timestamp: "14:22:15 CET",
      },
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
        caption: "Glavni vodomerni ventil i šaht (suvo)",
        timestamp: "14:27:40 CET",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        caption: "Zadnje dvorište, ograda i drenaža",
        timestamp: "14:35:10 CET",
      },
    ],
    checklist: [
      { name: "Dolazak i GPS prijava preko aplikacije", category: "security", status: "ok" },
      { name: "Aktivacija kontinuiranog video zapisa", category: "security", status: "ok" },
      { name: "Pregled perimetra, ograde i kapije", category: "exterior", status: "ok" },
      { name: "Provera ispravnosti brave na ulaznim vratima", category: "exterior", status: "ok" },
      { name: "Provera svih prozora i sigurnosnih roletni", category: "exterior", status: "ok" },
      { name: "Kontrola slavina i odsustvo curenja vode", category: "utilities", status: "ok" },
      { name: "Očitavanje i kontrola elektro-ormana", category: "utilities", status: "ok" },
      { name: "Pražnjenje sandučeta i slanje fotografije pošte", category: "exterior", status: "ok", note: "3 računa poslata u prilogu" },
      { name: "Pregled dvorišta nakon nedavnog vetra", category: "exterior", status: "ok" },
      { name: "Unutrašnji pregled soba i plafona (vlaga/mirisi)", category: "interior", status: "ok" },
      { name: "Provetravanje prostorija tokom posete", category: "interior", status: "ok" },
      { name: "Provera rada senzora pokreta i dima", category: "security", status: "ok" },
      { name: "Foto-fiksacija ključnih zona", category: "security", status: "ok" },
      { name: "Zaključavanje objekta i provera kapije", category: "security", status: "ok" },
      { name: "Generisanje digitalnog izveštaja", category: "security", status: "ok" },
    ],
  },
  {
    id: "VST-2026-10-20",
    date: "20.10.2026.",
    time: "10:30 - 11:05 CET",
    inspector: "Nikola Petrović",
    property: demoProperty.address,
    gps: "45.2238° N, 19.8451° E",
    status: "completed",
    summary: "Redovni obilazak. Trava uredna, oluci pročišćeni od jesenjeg lišća. Kuća temeljno provetrena 30 minuta.",
    photosCount: 12,
    videoDuration: "03:15 min",
    meters: {
      water: "0142.8 m³",
      electricity: "14.795 kWh",
    },
    photos: [
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        caption: "Dnevni boravak nakon provetravanja",
        timestamp: "10:45:00 CET",
      },
    ],
    checklist: [
      { name: "Pregled perimetra i brave", category: "exterior", status: "ok" },
      { name: "Provera vode i struje", category: "utilities", status: "ok" },
      { name: "Provetravanje objekta", category: "interior", status: "ok" },
    ],
  },
];

export const demoDocuments = [
  {
    id: "DOC-001",
    title: "Ugovor o poverenom nadzoru i čuvanju nepokretnosti #DOM-2026-084",
    type: "Ugovor",
    date: "15.08.2026.",
    status: "Važeći (potpisan)",
    size: "1.4 MB (PDF)",
  },
  {
    id: "DOC-002",
    title: "Revers o deponovanju ključeva u protivpožarni sef (Sef #A-14)",
    type: "Zapisnik",
    date: "15.08.2026.",
    status: "Overeno",
    size: "420 KB (PDF)",
  },
  {
    id: "DOC-003",
    title: "Mesečni izveštaj i faktura za Oktobar 2026.",
    type: "Faktura",
    date: "31.10.2026.",
    status: "Plaćeno",
    size: "280 KB (PDF)",
  },
];

