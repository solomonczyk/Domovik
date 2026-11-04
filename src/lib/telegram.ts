interface TelegramResult {
  sent: boolean;
  reason?: string;
}

/**
 * Sends a Markdown message to the configured Telegram chat.
 * Never throws: notifications must not break form submissions.
 */
export async function sendTelegramMessage(text: string): Promise<TelegramResult> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return { sent: false, reason: "not_configured" };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!response.ok) {
      console.error("Telegram notification failed:", await response.text());
      return { sent: false, reason: "request_failed" };
    }

    return { sent: true };
  } catch (error) {
    console.error("Telegram notification error:", error);
    return { sent: false, reason: "request_failed" };
  }
}
