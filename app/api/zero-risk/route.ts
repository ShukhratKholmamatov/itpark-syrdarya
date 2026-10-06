import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendMessage, escapeHtml } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fullName = String(body.fullName || "").trim().slice(0, 200);
    const contact = String(body.contact || "").trim().slice(0, 200);
    const companyName = String(body.companyName || "").trim().slice(0, 200);
    const message = String(body.message || "").trim().slice(0, 2000);
    const locale = String(body.locale || "uz").slice(0, 2);

    if (!fullName || !contact || !companyName) {
      return NextResponse.json(
        { ok: false, error: "missing_fields" },
        { status: 400 }
      );
    }

    const app = await prisma.zeroRiskApplication.create({
      data: { fullName, contact, companyName, message, locale },
    });

    const text =
      `🟢 <b>New Zero Risk application</b>\n\n` +
      `👤 <b>Name:</b> ${escapeHtml(fullName)}\n` +
      `🏢 <b>Company:</b> ${escapeHtml(companyName)}\n` +
      `📞 <b>Contact:</b> ${escapeHtml(contact)}\n` +
      (message ? `📝 <b>Message:</b> ${escapeHtml(message)}\n` : "") +
      `🌐 <b>Lang:</b> ${locale.toUpperCase()}\n` +
      `🕒 ${new Date().toLocaleString("en-GB")}`;

    const tg = await sendMessage(process.env.TELEGRAM_ZERO_RISK_CHAT_ID, text);
    if (tg?.ok) {
      await prisma.zeroRiskApplication.update({
        where: { id: app.id },
        data: { delivered: true },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[zero-risk] error:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
