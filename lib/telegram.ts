/**
 * Minimal Telegram Bot API helper.
 * Uses the HTTP Bot API (no extra dependency).
 *
 * Configure in .env:
 *   TELEGRAM_BOT_TOKEN
 *   TELEGRAM_ZERO_RISK_CHAT_ID   (group for Zero Risk applications)
 *   TELEGRAM_CAREERS_CHAT_ID     (group for CV / career submissions)
 */

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

function api(method: string) {
  return `https://api.telegram.org/bot${TOKEN}/${method}`;
}

export function telegramConfigured() {
  return Boolean(TOKEN);
}

export async function sendMessage(chatId: string | undefined, text: string) {
  if (!TOKEN || !chatId) {
    console.warn("[telegram] Not configured — message not sent:\n" + text);
    return { ok: false, skipped: true };
  }
  try {
    const res = await fetch(api("sendMessage"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    const data = await res.json();
    if (!data.ok) console.error("[telegram] sendMessage failed:", data);
    return data;
  } catch (err) {
    console.error("[telegram] sendMessage error:", err);
    return { ok: false, error: String(err) };
  }
}

export async function sendDocument(
  chatId: string | undefined,
  file: { buffer: Buffer; filename: string },
  caption?: string
) {
  if (!TOKEN || !chatId) {
    console.warn("[telegram] Not configured — document not sent.");
    return { ok: false, skipped: true };
  }
  try {
    const form = new FormData();
    form.append("chat_id", chatId);
    if (caption) {
      form.append("caption", caption);
      form.append("parse_mode", "HTML");
    }
    const blob = new Blob([new Uint8Array(file.buffer)]);
    form.append("document", blob, file.filename);

    const res = await fetch(api("sendDocument"), {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    if (!data.ok) console.error("[telegram] sendDocument failed:", data);
    return data;
  } catch (err) {
    console.error("[telegram] sendDocument error:", err);
    return { ok: false, error: String(err) };
  }
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
