import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";

export default async function GalleryPage({
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
        kicker={dict.gallery.kicker}
        title={dict.gallery.title}
        intro={dict.gallery.intro}
      />
      <section className="container-px py-16">
        <GalleryGrid closeLabel={dict.common.close} />
      </section>
    </>
  );
}
