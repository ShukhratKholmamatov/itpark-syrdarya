import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { PageHero } from "@/components/PageHero";
import { NewsCard } from "@/components/NewsCard";
import { Reveal } from "@/components/Reveal";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const posts = await prisma.newsPost
    .findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    })
    .catch(() => []);

  return (
    <>
      <PageHero
        kicker={dict.news.kicker}
        title={dict.news.title}
        intro={dict.news.intro}
      />
      <section className="container-px py-16">
        {posts.length === 0 ? (
          <div className="card flex flex-col items-center px-6 py-20 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-mist">
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M7 9h10M7 13h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <p className="mt-4 text-ink-muted">{dict.news.empty}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 70}>
                <NewsCard
                  locale={locale}
                  post={{
                    slug: post.slug,
                    title: post[`title${cap(locale)}` as "titleUz"],
                    excerpt: post[`excerpt${cap(locale)}` as "excerptUz"],
                    coverImage: post.coverImage,
                    publishedAt: post.publishedAt,
                  }}
                />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
