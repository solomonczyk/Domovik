import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/schemas";
import { sendTelegramMessage } from "@/lib/telegram";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = contactFormSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, phone, email, city, propertyType, comment } = result.data;

    // Log the lead details (ready for Telegram Bot / Resend integration)
    console.log("=== NEW DOMOVIK INQUIRY ===");
    console.log(`Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email}`);
    console.log(`City: ${city}`);
    console.log(`Property Type: ${propertyType}`);
    console.log(`Comment: ${comment || "None"}`);
    console.log("============================");

    const text = `🏠 *Novi upit za Domovik!*\n\n👤 *Ime:* ${name}\n📞 *Telefon:* ${phone}\n✉️ *Email:* ${email}\n📍 *Grad:* ${city}\n🏡 *Tip:* ${propertyType}\n💬 *Komentar:* ${comment || "-"}`;
    await sendTelegramMessage(text);

    return NextResponse.json({ success: true, message: "Inquiry received" });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

