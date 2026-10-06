import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/db";
import { sendMessage, sendDocument, escapeHtml } from "@/lib/telegram";

export const runtime = "nodejs";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXT = [".pdf", ".doc", ".docx"];

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const fullName = String(form.get("fullName") || "").trim().slice(0, 200);
    const contact = String(form.get("contact") || "").trim().slice(0, 200);
    const field = String(form.get("field") || "").trim().slice(0, 200);
    const message = String(form.get("message") || "").trim().slice(0, 2000);
    const locale = String(form.get("locale") || "uz").slice(0, 2);

    if (!fullName || !contact) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    // Handle optional CV file
    let cvPath: string | null = null;
    let cvBuffer: Buffer | null = null;
    let cvFilename = "";
    const file = form.get("cv");
    if (file && file instanceof File && file.size > 0) {
      const ext = path.extname(file.name).toLowerCase();
      if (!ALLOWED_EXT.includes(ext) || file.size > MAX_SIZE) {
        return NextResponse.json({ ok: false, error: "bad_file" }, { status: 400 });
      }
      cvBuffer = Buffer.from(await file.arrayBuffer());
      const safeName =
        fullName.replace(/[^a-zA-Z0-9]+/g, "_").slice(0, 40) || "cv";
      cvFilename = `${Date.now()}_${safeName}${ext}`;
      const dir = path.join(process.cwd(), "public", "uploads", "cv");
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, cvFilename), cvBuffer);
      cvPath = `/uploads/cv/${cvFilename}`;
    }

    const app = await prisma.careerApplication.create({
      data: { fullName, contact, field, message, locale, cvFile: cvPath },
    });

    const caption =
      `🎓 <b>New career / CV submission</b>\n\n` +
      `👤 <b>Name:</b> ${escapeHtml(fullName)}\n` +
      `📞 <b>Contact:</b> ${escapeHtml(contact)}\n` +
      (field ? `💼 <b>Field:</b> ${escapeHtml(field)}\n` : "") +
      (message ? `📝 <b>About:</b> ${escapeHtml(message)}\n` : "") +
      `🌐 <b>Lang:</b> ${locale.toUpperCase()}\n` +
      `🕒 ${new Date().toLocaleString("en-GB")}`;

    const chatId = process.env.TELEGRAM_CAREERS_CHAT_ID;
    let tg;
    if (cvBuffer) {
      tg = await sendDocument(chatId, { buffer: cvBuffer, filename: cvFilename }, caption);
    } else {
      tg = await sendMessage(chatId, caption + "\n\n⚠️ No CV file attached.");
    }

    if (tg?.ok) {
      await prisma.careerApplication.update({
        where: { id: app.id },
        data: { delivered: true },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[careers] error:", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
