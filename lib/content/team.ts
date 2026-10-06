import type { Locale } from "../i18n";

export interface TeamMember {
  /** Replace with the real full name */
  name: string;
  photo: string;
  role: Record<Locale, string>;
  phone?: string;
  email?: string;
  telegram?: string;
}

/**
 * NOTE: These are placeholder names, roles and contacts.
 * Replace `name`, `photo` (drop real photos into /public/images/team),
 * and contact details with the real IT Park Sirdaryo management team.
 */
export const team: TeamMember[] = [
  {
    name: "Ism Familiya",
    photo: "/images/team/director.webp",
    role: {
      uz: "Direktor",
      ru: "Директор",
      en: "Director",
    },
    phone: "+998 00 000 00 00",
    email: "director@itpark-sirdaryo.uz",
    telegram: "@itpark_sirdaryo",
  },
  {
    name: "Ism Familiya",
    photo: "/images/team/deputy.webp",
    role: {
      uz: "Direktor o‘rinbosari",
      ru: "Заместитель директора",
      en: "Deputy Director",
    },
    phone: "+998 00 000 00 00",
    email: "deputy@itpark-sirdaryo.uz",
  },
  {
    name: "Ism Familiya",
    photo: "/images/team/education.webp",
    role: {
      uz: "Ta’lim va loyihalar bo‘limi boshlig‘i",
      ru: "Руководитель отдела образования и проектов",
      en: "Head of Education & Projects",
    },
    phone: "+998 00 000 00 00",
    email: "education@itpark-sirdaryo.uz",
  },
  {
    name: "Ism Familiya",
    photo: "/images/team/residents.webp",
    role: {
      uz: "Rezidentlar va hamkorlik bo‘limi boshlig‘i",
      ru: "Руководитель отдела резидентов и партнёрств",
      en: "Head of Residents & Partnerships",
    },
    phone: "+998 00 000 00 00",
    email: "residents@itpark-sirdaryo.uz",
  },
  {
    name: "Ism Familiya",
    photo: "/images/team/community.webp",
    role: {
      uz: "Yoshlar va hamjamiyat yetakchisi",
      ru: "Лидер по работе с молодёжью и сообществом",
      en: "Youth & Community Lead",
    },
    phone: "+998 00 000 00 00",
    email: "community@itpark-sirdaryo.uz",
  },
  {
    name: "Ism Familiya",
    photo: "/images/team/marketing.webp",
    role: {
      uz: "Marketing va PR yetakchisi",
      ru: "Лидер по маркетингу и PR",
      en: "Marketing & PR Lead",
    },
    phone: "+998 00 000 00 00",
    email: "marketing@itpark-sirdaryo.uz",
  },
];
