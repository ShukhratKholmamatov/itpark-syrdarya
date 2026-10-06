import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { PageHero } from "@/components/PageHero";
import { CareerForm } from "@/components/CareerForm";
import { Reveal } from "@/components/Reveal";

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const t = dict.careers;

  return (
    <>
      <PageHero kicker={t.kicker} title={t.title} intro={t.intro} />
      <section className="container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-brand shadow-soft">
                <Image
                  src="/images/gallery/g05.webp"
                  alt=""
                  width={1600}
                  height={2133}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <h2 className="mt-8 text-2xl font-extrabold text-ink">
                {t.benefitsTitle}
              </h2>
              <ul className="mt-5 space-y-3">
                {t.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12l5 5L20 6" stroke="currentColor" strokeWidth="3" />
                      </svg>
                    </span>
                    <span className="text-ink-soft">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <CareerForm locale={locale} dict={dict} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
