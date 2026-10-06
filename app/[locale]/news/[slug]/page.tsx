import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = await prisma.newsPost.findUnique({ where: { slug } }).catch(() => null);
  if (!post) return {};
  return {
    title: post[`title${cap(locale)}` as "titleUz"],
    description: post[`excerpt${cap(locale)}` as "excerptUz"],
  };
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const post = await prisma.newsPost
    .findUnique({ where: { slug } })
    .catch(() => null);
  if (!post || !post.published) notFound();

  const title = post[`title${cap(locale)}` as "titleUz"];
  const body = post[`body${cap(locale)}` as "bodyUz"];
  const paragraphs = body.split(/\n{2,}/).filter((p) => p.trim());

  return (
    <article className="pb-16">
      <div className="container-px pt-10">
        <Link
          href={`/${locale}/news`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted transition hover:text-brand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" />
          </svg>
          {dict.news.backToNews}
        </Link>
      </div>

      <div className="container-px mx-auto mt-6 max-w-3xl">
        <time className="text-sm font-bold uppercase tracking-wider text-brand-600">
          {dict.news.publishedOn} {formatDate(post.publishedAt, locale)}
        </time>
        <h1 className="mt-3 text-3xl font-black leading-tight text-ink sm:text-4xl">
          {title}
        </h1>

        {post.coverImage && (
          <div className="mt-8 overflow-hidden rounded-brand shadow-soft">
            <Image
              src={post.coverImage}
              alt={title}
              width={1600}
              height={900}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        <div className="prose-news mt-8">
          {paragraphs.map((p, i) => (
            <p key={i} className="whitespace-pre-wrap">
              {p}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
