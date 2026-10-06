import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { programs } from "@/lib/content/programs";
import { ProgramCard } from "@/components/ProgramCard";
import { NewsCard } from "@/components/NewsCard";
import { StatsBand } from "@/components/StatsBand";
import { Reveal } from "@/components/Reveal";
import { prisma } from "@/lib/db";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.home;

  const latestNews = await prisma.newsPost
    .findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    })
    .catch(() => []);

  const featured = programs.filter((p) => p.featured);
  const otherPrograms = programs.filter((p) => !p.featured).slice(0, 4);

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-matrix opacity-70" aria-hidden />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-100/60 blur-3xl" aria-hidden />
        <div className="container-px relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <Reveal>
              <span className="kicker rounded-full bg-brand-50 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {t.heroBadge}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-4xl font-black leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                {t.heroTitle}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
                {t.heroSubtitle}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${locale}/programs`} className="btn-primary">
                  {t.heroCtaPrimary}
                </Link>
                <Link href={`/${locale}/careers`} className="btn-outline">
                  {t.heroCtaSecondary}
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative">
            <div className="relative overflow-hidden rounded-brand shadow-card">
              <Image
                src="/images/building/building-1.webp"
                alt={t.buildingCaption}
                width={1920}
                height={1440}
                priority
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5">
                <p className="text-sm font-semibold text-white/90">
                  {t.buildingCaption}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Stats ───────── */}
      <StatsBand title={t.statsTitle} stats={t.stats} />

      {/* ───────── About ───────── */}
      <section id="about" className="container-px py-20">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/images/building/building-2.webp"
                alt="IT Park Sirdaryo"
                width={1920}
                height={1440}
                className="col-span-2 aspect-[16/9] w-full rounded-brand object-cover shadow-soft"
              />
              <Image
                src="/images/gallery/g03.webp"
                alt=""
                width={1600}
                height={2133}
                className="aspect-square w-full rounded-brand object-cover shadow-soft"
              />
              <Image
                src="/images/gallery/g07.webp"
                alt=""
                width={1600}
                height={2133}
                className="aspect-square w-full rounded-brand object-cover shadow-soft"
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <span className="kicker">{t.aboutKicker}</span>
            <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              {t.aboutTitle}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-muted">{t.aboutText1}</p>
            <p className="mt-4 leading-relaxed text-ink-muted">{t.aboutText2}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.aboutPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-ink-soft">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ───────── Parent org ───────── */}
      <section className="bg-mist-light">
        <div className="container-px grid items-center gap-12 py-20 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <span className="kicker">{t.parentKicker}</span>
            <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              {t.parentTitle}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-muted">{t.parentText}</p>
            <a
              href="https://it-park.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark mt-7"
            >
              {t.parentCta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" />
              </svg>
            </a>
          </Reveal>
          <Reveal delay={120}>
            <div className="card flex items-center justify-center p-10">
              <Image
                src="/brand/logo-itpark-uz.png"
                alt="IT Park Uzbekistan"
                width={2477}
                height={817}
                className="h-auto w-full max-w-sm"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Programs ───────── */}
      <section className="container-px py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="kicker">{t.programsKicker}</span>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
            {t.programsTitle}
          </h2>
          <p className="mt-4 text-ink-muted">{t.programsText}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...featured, ...otherPrograms].slice(0, 6).map((program, i) => (
            <Reveal key={program.slug} delay={(i % 3) * 80}>
              <ProgramCard program={program} locale={locale} dict={dict} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href={`/${locale}/programs`} className="btn-outline">
            {dict.common.viewAll}
          </Link>
        </div>
      </section>

      {/* ───────── Latest news ───────── */}
      {latestNews.length > 0 && (
        <section className="bg-mist-light">
          <div className="container-px py-20">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="kicker">{t.newsKicker}</span>
                <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
                  {t.newsTitle}
                </h2>
              </div>
              <Link href={`/${locale}/news`} className="btn-ghost">
                {dict.common.viewAll} →
              </Link>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestNews.map((post, i) => (
                <Reveal key={post.id} delay={(i % 3) * 80}>
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
          </div>
        </section>
      )}

      {/* ───────── CTA ───────── */}
      <section className="container-px py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-brand bg-ink px-8 py-14 text-center sm:px-16">
            <div className="absolute inset-0 bg-matrix opacity-[0.15]" aria-hidden />
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand/20 blur-3xl" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-black text-white sm:text-4xl">
                {t.ctaTitle}
              </h2>
              <p className="mt-4 text-white/70">{t.ctaText}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href={`/${locale}/zero-risk`} className="btn-primary">
                  {t.ctaPrimary}
                </Link>
                <Link
                  href={`/${locale}/careers`}
                  className="btn inline-flex border-2 border-white/20 text-white hover:border-brand hover:text-brand"
                >
                  {t.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
