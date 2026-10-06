import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { team } from "@/lib/content/team";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export default async function TeamPage({
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
        kicker={dict.team.kicker}
        title={dict.team.title}
        intro={dict.team.intro}
      />
      <section className="container-px py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={i} delay={(i % 3) * 70}>
              <div className="group card overflow-hidden transition hover:shadow-card">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-50">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-brand-600">
                    {member.role[locale]}
                  </p>
                  <div className="mt-4 space-y-2 border-t border-ink/5 pt-4 text-sm">
                    {[member.phone, member.phone2].filter(Boolean).map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone!.replace(/\s/g, "")}`}
                        className="flex items-center gap-2.5 text-ink-muted transition hover:text-brand"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                          <path d="M4 5c0 8 7 15 15 15l2-3-4-2-2 2c-3-1.5-5.5-4-7-7l2-2-2-4-4 1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        </svg>
                        {phone}
                      </a>
                    ))}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2.5 text-ink-muted transition hover:text-brand"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                          <path d="M4 6l8 6 8-6M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                        {member.email}
                      </a>
                    )}
                    {member.telegram && (
                      <a
                        href={`https://t.me/${member.telegram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-ink-muted transition hover:text-brand"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                          <path d="M21 4L3 11l6 2 2 6 3-4 4 3 3-14z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        </svg>
                        {member.telegram}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
