import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { programs } from "@/lib/content/programs";
import { ProgramCard } from "@/components/ProgramCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        kicker={dict.programs.kicker}
        title={dict.programs.title}
        intro={dict.programs.intro}
      />
      <section className="container-px py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <Reveal key={program.slug} delay={(i % 3) * 70}>
              <ProgramCard program={program} locale={locale} dict={dict} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
