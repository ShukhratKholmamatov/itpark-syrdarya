import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

export interface NewsCardData {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  publishedAt: Date | string;
}

export function NewsCard({
  post,
  locale,
}: {
  post: NewsCardData;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/news/${post.slug}`}
      className="group card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-mist-light">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-50">
            <Image
              src="/brand/mark-192.png"
              alt=""
              width={72}
              height={72}
              className="opacity-40"
            />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <time className="text-xs font-bold uppercase tracking-wider text-brand-600">
          {formatDate(post.publishedAt, locale)}
        </time>
        <h3 className="mt-2 text-lg font-extrabold leading-snug text-ink transition group-hover:text-brand-700">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
