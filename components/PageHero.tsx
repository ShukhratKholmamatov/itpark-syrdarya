export function PageHero({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink/5 bg-white">
      <div className="absolute inset-0 bg-matrix opacity-60" aria-hidden />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-100/50 blur-3xl" aria-hidden />
      <div className="container-px relative py-14 sm:py-20">
        <span className="kicker">{kicker}</span>
        <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[1.08] text-ink sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
