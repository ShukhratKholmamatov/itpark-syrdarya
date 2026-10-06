import type { Locale } from "../i18n";
import en, { type Dictionary } from "./en";
import uz from "./uz";
import ru from "./ru";

const dictionaries: Record<Locale, Dictionary> = { uz, ru, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? uz;
}

export type { Dictionary };
