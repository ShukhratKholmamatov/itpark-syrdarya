import type { Locale } from "../i18n";

export interface TeamMember {
  name: string;
  photo: string;
  role: Record<Locale, string>;
  phone?: string;
  phone2?: string;
  email?: string;
  telegram?: string;
}

/**
 * IT Park Sirdaryo management team.
 * Photos are placeholder initial-avatars — replace the files in
 * /public/images/team/ (keep the same filenames) with real photos.
 */
export const team: TeamMember[] = [
  {
    name: "Xurshid Suvonov",
    photo: "/images/team/suvonov.webp",
    role: {
      uz: "Filial boshlig‘i",
      ru: "Руководитель филиала",
      en: "Branch Director",
    },
    phone: "+998 99 477 47 49",
    email: "x.suvonov@outsource.gov.uz",
  },
  {
    name: "Ali Farhodov",
    photo: "/images/team/farhodov.webp",
    role: {
      uz: "Loyihalar bo‘yicha menejer",
      ru: "Менеджер по проектам",
      en: "Project Manager",
    },
    phone: "+998 99 374 09 66",
    email: "a.farhodov@outsource.gov.uz",
  },
  {
    name: "Mirbobojon G‘aybullayev",
    photo: "/images/team/gaybullayev.webp",
    role: {
      uz: "Startaplar bo‘yicha bosh menejer",
      ru: "Главный менеджер по стартапам",
      en: "Chief Startup Manager",
    },
    phone: "+998 97 275 23 95",
    phone2: "+998 94 917 27 57",
    email: "m.gaybullayev@outsource.gov.uz",
  },
  {
    name: "Axror Narzullayev",
    photo: "/images/team/narzullayev.webp",
    role: {
      uz: "Startaplar bo‘yicha bosh menejer",
      ru: "Главный менеджер по стартапам",
      en: "Chief Startup Manager",
    },
    phone: "+998 99 493 82 11",
    email: "a.narzullayev@outsource.gov.uz",
  },
  {
    name: "Umrzoq Valiyev",
    photo: "/images/team/valiyev.webp",
    role: {
      uz: "Infratuzilma bo‘yicha menejer",
      ru: "Менеджер по инфраструктуре",
      en: "Infrastructure Manager",
    },
    phone: "+998 90 047 57 40",
    email: "o.valiev@outsource.gov.uz",
  },
];
