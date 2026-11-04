import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { serviceRequestSchema } from "@/lib/schemas";
import { sendTelegramMessage } from "@/lib/telegram";

const serviceLabels: Record<string, string> = {
  prepareArrival: "Priprema kuće pred dolazak",
  cleaning: "Generalno / periodično čišćenje",
  yardCare: "Košenje trave i održavanje dvorišta",
  stormCheck: "Vanredni pregled nakon nevremena",
  plantWatering: "Dodatno zalivanje biljaka",
  petCare: "Briga i hranjenje ljubimaca",
};

const urgencyLabels: Record<string, string> = {
  standard: "Standardno (3-5 dana)",
  urgent: "Hitno (24 časa)",
  scheduled: "Planirano za tačan datum",
};

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const parsed = serviceRequestSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { service, date, urgency, note } = parsed.data;

    console.log("=== NEW DOMOVIK SERVICE REQUEST ===");
    console.log(`Client: ${session.name} <${session.email}>`);
    console.log(`Service: ${serviceLabels[service] ?? service}`);
    console.log(`Date: ${date}`);
    console.log(`Urgency: ${urgencyLabels[urgency] ?? urgency}`);
    console.log(`Note: ${note || "None"}`);
    console.log("===================================");

    const text = [
      "🏠 *Novi zahtev iz klijentskog portala*",
      "",
      `👤 *Klijent:* ${session.name}`,
      `✉️ *Email:* ${session.email}`,
      `🧰 *Usluga:* ${serviceLabels[service] ?? service}`,
      `📅 *Datum:* ${date}`,
      `⚡ *Hitnost:* ${urgencyLabels[urgency] ?? urgency}`,
      `💬 *Napomena:* ${note || "-"}`,
    ].join("\n");

    await sendTelegramMessage(text);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing service request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
