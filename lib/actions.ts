"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import { prisma } from "./db";
import {
  createSession,
  setSessionCookie,
  clearSessionCookie,
  getSession,
} from "./auth";
import { slugify } from "./utils";

export interface ActionState {
  error?: string;
  ok?: boolean;
}

/* ───────────── Auth ───────────── */

export async function loginAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (!username || !password) return { error: "invalid" };

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return { error: "invalid" };

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return { error: "invalid" };

  const token = await createSession({
    uid: admin.id,
    username: admin.username,
    name: admin.name,
  });
  await setSessionCookie(token);
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

/* ───────────── News helpers ───────────── */

async function saveCover(file: FormDataEntryValue | null): Promise<string | null> {
  if (!file || !(file instanceof File) || file.size === 0) return null;
  const ext = path.extname(file.name).toLowerCase() || ".jpg";
  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  if (!allowed.includes(ext)) return null;
  if (file.size > 8 * 1024 * 1024) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const name = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "news");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buffer);
  return `/uploads/news/${name}`;
}

function readPostFields(formData: FormData) {
  return {
    titleUz: String(formData.get("titleUz") || "").trim(),
    titleRu: String(formData.get("titleRu") || "").trim(),
    titleEn: String(formData.get("titleEn") || "").trim(),
    excerptUz: String(formData.get("excerptUz") || "").trim(),
    excerptRu: String(formData.get("excerptRu") || "").trim(),
    excerptEn: String(formData.get("excerptEn") || "").trim(),
    bodyUz: String(formData.get("bodyUz") || "").trim(),
    bodyRu: String(formData.get("bodyRu") || "").trim(),
    bodyEn: String(formData.get("bodyEn") || "").trim(),
    published: formData.get("published") === "on",
  };
}

async function uniqueSlug(base: string, excludeId?: number): Promise<string> {
  let slug = slugify(base) || `post-${Date.now()}`;
  let i = 1;
  // ensure uniqueness
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.newsPost.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) break;
    slug = `${slugify(base)}-${++i}`;
  }
  return slug;
}

/* ───────────── News actions ───────────── */

export async function createPostAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const f = readPostFields(formData);

  const primaryTitle = f.titleUz || f.titleRu || f.titleEn;
  if (!primaryTitle || !(f.bodyUz || f.bodyRu || f.bodyEn)) {
    return { error: "missing" };
  }

  const cover = await saveCover(formData.get("cover"));
  const slug = await uniqueSlug(f.titleEn || f.titleUz || f.titleRu);

  await prisma.newsPost.create({
    data: {
      slug,
      coverImage: cover,
      // fall back missing locales to the primary language so every page renders
      titleUz: f.titleUz || primaryTitle,
      titleRu: f.titleRu || primaryTitle,
      titleEn: f.titleEn || primaryTitle,
      excerptUz: f.excerptUz,
      excerptRu: f.excerptRu,
      excerptEn: f.excerptEn,
      bodyUz: f.bodyUz || f.bodyRu || f.bodyEn,
      bodyRu: f.bodyRu || f.bodyUz || f.bodyEn,
      bodyEn: f.bodyEn || f.bodyUz || f.bodyRu,
      published: f.published,
    },
  });

  revalidatePath("/[locale]/news", "page");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updatePostAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (!id) return { error: "missing" };
  const f = readPostFields(formData);
  const primaryTitle = f.titleUz || f.titleRu || f.titleEn;
  if (!primaryTitle) return { error: "missing" };

  const cover = await saveCover(formData.get("cover"));

  await prisma.newsPost.update({
    where: { id },
    data: {
      ...(cover ? { coverImage: cover } : {}),
      titleUz: f.titleUz || primaryTitle,
      titleRu: f.titleRu || primaryTitle,
      titleEn: f.titleEn || primaryTitle,
      excerptUz: f.excerptUz,
      excerptRu: f.excerptRu,
      excerptEn: f.excerptEn,
      bodyUz: f.bodyUz || f.bodyRu || f.bodyEn,
      bodyRu: f.bodyRu || f.bodyUz || f.bodyEn,
      bodyEn: f.bodyEn || f.bodyUz || f.bodyRu,
      published: f.published,
    },
  });

  revalidatePath("/[locale]/news", "page");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  if (id) {
    await prisma.newsPost.delete({ where: { id } }).catch(() => {});
    revalidatePath("/[locale]/news", "page");
    revalidatePath("/admin");
  }
}
