import type { Locale } from "../i18n";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export interface Program {
  slug: string;
  /** Icon key rendered by components/ProgramIcon */
  icon: string;
  featured?: boolean;
  name: LocalizedText;
  tagline: LocalizedText;
  summary: LocalizedText;
  description: Record<Locale, string[]>; // paragraphs
  benefits: LocalizedList;
  eligibility: LocalizedList;
  /** Show the Zero Risk application CTA on the detail page */
  showApply?: boolean;
}

export const programs: Program[] = [
  {
    slug: "zero-risk",
    icon: "shield",
    featured: true,
    showApply: true,
    name: {
      uz: "Zero Risk",
      ru: "Zero Risk",
      en: "Zero Risk",
    },
    tagline: {
      uz: "O‘zbekiston IT bozoriga minimal xarajat bilan kiring",
      ru: "Выход на IT-рынок Узбекистана с минимальными затратами",
      en: "Enter Uzbekistan’s IT market with minimal costs",
    },
    summary: {
      uz: "Chet el IT kompaniyalari uchun bozorga kirish dasturi: bepul ofis, uskunalar va xodimlar uchun kompensatsiyalar.",
      ru: "Программа входа на рынок для иностранных IT-компаний: бесплатный офис, оборудование и компенсации за сотрудников.",
      en: "A market-entry program for foreign IT companies: free office, equipment and employee compensation.",
    },
    description: {
      uz: [
        "Zero Risk — O‘zbekiston IT Park tomonidan Raqamli texnologiyalar vazirligi ko‘magida ishlab chiqilgan dastur. Uning maqsadi — mamlakatdagi ishbilarmonlik muhitini yaxshilash, chet el investitsiyalarini jalb qilish hamda IT va BPO autsorsing sohasidagi eksport faolligini rag‘batlantirish.",
        "Dastur eksportga yo‘naltirilgan IT kompaniyalarga O‘zbekistonga, jumladan Sirdaryo viloyatiga, xavf-xatarsiz kirish imkonini beradi — chunki dastlabki xarajatlarning katta qismi qoplab beriladi.",
      ],
      ru: [
        "Zero Risk — программа, разработанная IT Park Uzbekistan при поддержке Министерства цифровых технологий. Её цель — улучшить деловой климат в стране, привлечь иностранные инвестиции и стимулировать экспорт в сфере IT и BPO-аутсорсинга.",
        "Программа позволяет экспортно-ориентированным IT-компаниям выйти на рынок Узбекистана, в том числе в Сырдарьинскую область, без риска — значительная часть первоначальных затрат компенсируется.",
      ],
      en: [
        "Zero Risk is a program developed by IT Park Uzbekistan with the support of the Ministry of Digital Technologies. Its goal is to improve the business climate, attract foreign investment and stimulate export activity in IT and BPO outsourcing.",
        "The program lets export-oriented IT companies enter the market of Uzbekistan — including the Sirdaryo region — with no risk, because most of the initial costs are reimbursed.",
      ],
    },
    benefits: {
      uz: [
        "12 oygacha bepul ofis maydoni",
        "Uskuna va mebel bilan jihozlashda yordam (15 oylik to‘lov imtiyozi bilan)",
        "Har bir ishga olingan xodim uchun $500 kompensatsiya",
        "O‘zbekiston fuqarolari maoshining 15% gacha qoplanishi",
        "100 nafargacha xodimni o‘qitish xarajatlarining 50% gacha (jami $5 000 gacha) qoplanishi",
      ],
      ru: [
        "Бесплатный офис на срок до 12 месяцев",
        "Помощь в оснащении оборудованием и мебелью (с рассрочкой до 15 месяцев)",
        "Компенсация $500 за каждого нанятого сотрудника",
        "Возмещение до 15% зарплат граждан Узбекистана",
        "Возмещение до 50% расходов на обучение до 100 сотрудников (до $5 000)",
      ],
      en: [
        "Free office space for up to 12 months",
        "Help equipping the office (with up to 15 months grace on payments)",
        "$500 compensation for each hired employee",
        "Reimbursement of up to 15% of salaries for Uzbek citizens",
        "Up to 50% of training costs for up to 100 employees (up to $5,000)",
      ],
    },
    eligibility: {
      uz: [
        "IT Park rezidenti bo‘lish",
        "Yiliga kamida $500 000 eksport shartnomasi yoki bosh kompaniyaning yillik aylanmasi kamida $50 mln",
        "Toshkentdan tashqari istalgan viloyatda jismoniy manzil (masalan, Sirdaryo)",
        "Kamida 50 nafar O‘zbekiston fuqarosi xodim",
      ],
      ru: [
        "Быть резидентом IT Park",
        "Экспортный контракт от $500 000 в год или годовой оборот материнской компании от $50 млн",
        "Физический адрес в любом регионе, кроме Ташкента (например, Сырдарья)",
        "Не менее 50 сотрудников — граждан Узбекистана",
      ],
      en: [
        "Be a resident of IT Park",
        "An export contract of at least $500,000/year, or parent company annual turnover of at least $50M",
        "A physical address in any region except Tashkent (e.g. Sirdaryo)",
        "At least 50 employees who are citizens of Uzbekistan",
      ],
    },
  },
  {
    slug: "local2global",
    icon: "globe",
    featured: true,
    name: {
      uz: "Local2Global (Zero to Global)",
      ru: "Local2Global (Zero to Global)",
      en: "Local2Global (Zero to Global)",
    },
    tagline: {
      uz: "Mahalliy kompaniyalarni global bozorga olib chiqamiz",
      ru: "Выводим местные компании на глобальный рынок",
      en: "Taking local companies to the global market",
    },
    summary: {
      uz: "Mahalliy IT kompaniyalariga xalqaro bozorlarga chiqishda yordam: eksport konsalting, ko‘rgazmalar va mentorlik.",
      ru: "Помощь местным IT-компаниям в выходе на международные рынки: экспорт-консалтинг, выставки и менторство.",
      en: "Helping local IT companies enter international markets: export consulting, exhibitions and mentorship.",
    },
    description: {
      uz: [
        "Local2Global dasturi xalqaro bozorlarga muvaffaqiyatli chiqishni maqsad qilgan mahalliy kompaniyalar uchun mo‘ljallangan. Dastur eksport rejasini ishlab chiqish, istiqbolli bozorlarni aniqlash, mijozlar topish va muzokaralar olib borishda bepul konsalting xizmatlarini taqdim etadi.",
        "Sirdaryolik kompaniyalar ushbu dastur orqali o‘z mahsulot va xizmatlarini dunyoga eksport qilish imkoniyatiga ega bo‘ladi.",
      ],
      ru: [
        "Программа Local2Global предназначена для местных компаний, стремящихся выйти на международные рынки. Она предоставляет бесплатный консалтинг по разработке экспортного плана, определению перспективных рынков, поиску клиентов и ведению переговоров.",
        "Компании из Сырдарьи получают возможность экспортировать свои продукты и услуги по всему миру.",
      ],
      en: [
        "Local2Global is designed for local companies aiming to enter international markets. It provides free consulting on building an export plan, identifying promising markets, finding clients and conducting negotiations.",
        "Companies from Sirdaryo gain the opportunity to export their products and services worldwide.",
      ],
    },
    benefits: {
      uz: [
        "Eksport konsalting xarajatlarining 50% gacha qoplanishi",
        "Xorijiy ekspertlar xizmatlari uchun $10 000 gacha qoplash",
        "Xalqaro ko‘rgazma va konferensiyalarda ishtirok uchun $5 000 gacha",
        "Xorijiy hamkorlarni O‘zbekistonga taklif qilish (eksport hajmiga qarab $20 000 gacha)",
        "Coursera kurslariga bepul kirish va eksport mentorligi",
      ],
      ru: [
        "Возмещение до 50% расходов на экспорт-консалтинг",
        "Компенсация услуг иностранных экспертов до $10 000",
        "До $5 000 на участие в международных выставках и конференциях",
        "Приглашение зарубежных партнёров в Узбекистан (до $20 000 в зависимости от объёма экспорта)",
        "Бесплатный доступ к курсам Coursera и экспорт-менторство",
      ],
      en: [
        "Up to 50% of export consulting costs reimbursed",
        "Up to $10,000 for services of foreign experts",
        "Up to $5,000 for international exhibitions and conferences",
        "Inviting foreign partners to Uzbekistan (up to $20,000 depending on export volume)",
        "Free access to Coursera courses and export mentorship",
      ],
    },
    eligibility: {
      uz: [
        "IT Park rezidenti bo‘lgan mahalliy kompaniya",
        "Xalqaro bozorga chiqishga tayyor mahsulot yoki xizmat",
        "Eksport salohiyatiga ega jamoa",
      ],
      ru: [
        "Местная компания — резидент IT Park",
        "Продукт или услуга, готовые к выходу на международный рынок",
        "Команда с экспортным потенциалом",
      ],
      en: [
        "A local company that is an IT Park resident",
        "A product or service ready for international markets",
        "A team with export potential",
      ],
    },
  },
  {
    slug: "digital-startups",
    icon: "rocket",
    name: {
      uz: "Digital Startups",
      ru: "Digital Startups",
      en: "Digital Startups",
    },
    tagline: {
      uz: "G‘oyadan mahsulotgacha — startaplarni qo‘llab-quvvatlash",
      ru: "От идеи к продукту — поддержка стартапов",
      en: "From idea to product — startup support",
    },
    summary: {
      uz: "Erta bosqichdagi texnologik startaplar uchun akseleratsiya, grantlar, mentorlik va investorlarga kirish.",
      ru: "Акселерация, гранты, менторство и доступ к инвесторам для стартапов на ранней стадии.",
      en: "Acceleration, grants, mentorship and investor access for early-stage tech startups.",
    },
    description: {
      uz: [
        "Digital Startups dasturi erta bosqichdagi texnologik jamoalarni g‘oyani ishlaydigan mahsulotga aylantirishda qo‘llab-quvvatlaydi. Startaplar akseleratsiya dasturlari, mentorlik, grant mablag‘lari va investorlar bilan uchrashuvlardan foydalanadi.",
        "Sirdaryolik yosh tadbirkorlar o‘z g‘oyalarini mahalliy darajada rivojlantirishi mumkin.",
      ],
      ru: [
        "Программа Digital Startups поддерживает технологические команды ранней стадии в превращении идеи в работающий продукт. Стартапы получают доступ к акселерационным программам, менторству, грантам и встречам с инвесторами.",
        "Молодые предприниматели из Сырдарьи могут развивать свои идеи на местном уровне.",
      ],
      en: [
        "The Digital Startups program supports early-stage tech teams in turning an idea into a working product. Startups access acceleration programs, mentorship, grant funding and investor meetings.",
        "Young entrepreneurs from Sirdaryo can grow their ideas locally.",
      ],
    },
    benefits: {
      uz: [
        "Akseleratsiya va inkubatsiya dasturlari",
        "Grant va seed moliyalashtirish imkoniyatlari",
        "Tajribali mentorlar bilan ishlash",
        "Investorlar va demo-kunlarga kirish",
        "IT Park koworking maydonidan foydalanish",
      ],
      ru: [
        "Программы акселерации и инкубации",
        "Возможности грантов и seed-финансирования",
        "Работа с опытными менторами",
        "Доступ к инвесторам и demo-day",
        "Доступ к коворкингу IT Park",
      ],
      en: [
        "Acceleration and incubation programs",
        "Grant and seed funding opportunities",
        "Work with experienced mentors",
        "Access to investors and demo days",
        "Access to IT Park coworking space",
      ],
    },
    eligibility: {
      uz: [
        "Innovatsion texnologik g‘oya yoki prototip",
        "Mahsulotni rivojlantirishga intilgan jamoa",
        "Startapni ro‘yxatdan o‘tkazishga tayyorlik",
      ],
      ru: [
        "Инновационная технологическая идея или прототип",
        "Команда, стремящаяся развивать продукт",
        "Готовность зарегистрировать стартап",
      ],
      en: [
        "An innovative technology idea or prototype",
        "A team committed to building the product",
        "Readiness to register the startup",
      ],
    },
  },
  {
    slug: "soft-landing",
    icon: "plane",
    name: {
      uz: "Soft Landing",
      ru: "Soft Landing",
      en: "Soft Landing",
    },
    tagline: {
      uz: "O‘zbekistonga yumshoq qo‘nish",
      ru: "Мягкая посадка в Узбекистане",
      en: "A soft landing in Uzbekistan",
    },
    summary: {
      uz: "Ko‘chib keluvchi kompaniya va mutaxassislar uchun turar joy, huquqiy yordam va ofis infratuzilmasi.",
      ru: "Жильё, юридическая поддержка и офисная инфраструктура для релоцирующихся компаний и специалистов.",
      en: "Housing, legal support and office infrastructure for relocating companies and professionals.",
    },
    description: {
      uz: [
        "Soft Landing dasturi O‘zbekistonga ko‘chib kelayotgan kompaniyalar va mutaxassislarga tez va qulay joylashishda yordam beradi — turar joy, huquqiy masalalar va ofis infratuzilmasi bo‘yicha ko‘mak ko‘rsatiladi.",
        "Bu dastur xalqaro jamoalarga Sirdaryo kabi viloyatlarda ishni tezda yo‘lga qo‘yish imkonini beradi.",
      ],
      ru: [
        "Программа Soft Landing помогает компаниям и специалистам, переезжающим в Узбекистан, быстро и комфортно обосноваться — с поддержкой по жилью, юридическим вопросам и офисной инфраструктуре.",
        "Программа позволяет международным командам быстро начать работу в таких регионах, как Сырдарья.",
      ],
      en: [
        "The Soft Landing program helps companies and professionals relocating to Uzbekistan settle quickly and comfortably — with support for housing, legal matters and office infrastructure.",
        "It enables international teams to get up and running fast in regions like Sirdaryo.",
      ],
    },
    benefits: {
      uz: [
        "Turar joy topishda yordam",
        "Huquqiy va ro‘yxatdan o‘tkazish bo‘yicha ko‘mak",
        "Tayyor ofis infratuzilmasi",
        "Mahalliy ekotizimga integratsiya",
      ],
      ru: [
        "Помощь в поиске жилья",
        "Юридическая поддержка и регистрация",
        "Готовая офисная инфраструктура",
        "Интеграция в местную экосистему",
      ],
      en: [
        "Help finding housing",
        "Legal support and registration",
        "Ready-to-use office infrastructure",
        "Integration into the local ecosystem",
      ],
    },
    eligibility: {
      uz: [
        "O‘zbekistonga ko‘chib kelmoqchi bo‘lgan kompaniya yoki mutaxassis",
        "IT yoki texnologiya sohasida faoliyat",
      ],
      ru: [
        "Компания или специалист, переезжающие в Узбекистан",
        "Деятельность в сфере IT или технологий",
      ],
      en: [
        "A company or professional relocating to Uzbekistan",
        "Activity in the IT or technology sector",
      ],
    },
  },
  {
    slug: "it-visa",
    icon: "passport",
    name: {
      uz: "IT Visa",
      ru: "IT Visa",
      en: "IT Visa",
    },
    tagline: {
      uz: "IT mutaxassislari uchun 3 yilgacha viza",
      ru: "Виза до 3 лет для IT-специалистов",
      en: "A visa of up to 3 years for IT professionals",
    },
    summary: {
      uz: "IT investorlar, asoschilar va mutaxassislar uchun 3 yilgacha viza hamda ijtimoiy xizmatlarga kirish.",
      ru: "Виза до 3 лет и доступ к социальным услугам для IT-инвесторов, основателей и специалистов.",
      en: "A up-to-3-year visa and access to social services for IT investors, founders and professionals.",
    },
    description: {
      uz: [
        "IT Visa dasturi IT sohasi investorlari, IT Park rezident kompaniyalari asoschilari hamda yillik daromadi $30 000 dan ortiq bo‘lgan IT mutaxassislariga 3 yilgacha viza beradi.",
        "Viza egalariga sog‘liqni saqlash va ta’lim kabi ijtimoiy xizmatlardan fuqarolar bilan teng foydalanish, shuningdek ko‘chmas mulk sotib olish imkoniyati beriladi.",
      ],
      ru: [
        "Программа IT Visa предоставляет визу до 3 лет инвесторам в IT, основателям компаний-резидентов IT Park и IT-специалистам с годовым доходом более $30 000.",
        "Держателям визы доступны социальные услуги — здравоохранение и образование наравне с гражданами, а также возможность покупки недвижимости.",
      ],
      en: [
        "The IT Visa program grants a visa of up to 3 years to IT investors, founders of IT Park resident companies and IT professionals with an annual income above $30,000.",
        "Visa holders can access social services — healthcare and education on equal terms with citizens — and purchase real estate.",
      ],
    },
    benefits: {
      uz: [
        "3 yilgacha amal qiluvchi viza",
        "Sog‘liqni saqlash va ta’limga fuqarolar bilan teng kirish",
        "Ko‘chmas mulk sotib olish imkoniyati",
        "Oila a’zolari uchun ham imtiyozlar",
      ],
      ru: [
        "Виза сроком до 3 лет",
        "Доступ к здравоохранению и образованию наравне с гражданами",
        "Возможность покупки недвижимости",
        "Льготы также для членов семьи",
      ],
      en: [
        "A visa valid for up to 3 years",
        "Access to healthcare and education on par with citizens",
        "The ability to purchase real estate",
        "Benefits for family members too",
      ],
    },
    eligibility: {
      uz: [
        "IT sohasi investori yoki IT Park rezidenti asoschisi",
        "Yoki yillik daromadi $30 000 dan ortiq IT mutaxassisi",
      ],
      ru: [
        "Инвестор в IT или основатель резидента IT Park",
        "Либо IT-специалист с годовым доходом более $30 000",
      ],
      en: [
        "An IT investor or founder of an IT Park resident",
        "Or an IT professional with annual income above $30,000",
      ],
    },
  },
  {
    slug: "residency",
    icon: "badge",
    name: {
      uz: "IT Park rezidentligi",
      ru: "Резидентство IT Park",
      en: "IT Park Residency",
    },
    tagline: {
      uz: "Soliq imtiyozlari va to‘liq ekotizim",
      ru: "Налоговые льготы и полная экосистема",
      en: "Tax incentives and the full ecosystem",
    },
    summary: {
      uz: "IT Park rezidenti bo‘ling va eng raqobatbardosh soliq imtiyozlari hamda xizmatlardan foydalaning.",
      ru: "Станьте резидентом IT Park и получите самые конкурентные налоговые льготы и сервисы.",
      en: "Become an IT Park resident and unlock the most competitive tax incentives and services.",
    },
    description: {
      uz: [
        "IT Park rezidentligi IT kompaniyalariga mamlakatdagi eng qulay soliq rejimini taqdim etadi. Rezidentlar 2028-yilgacha foyda solig‘i, QQS, ijtimoiy soliq va aylanma solig‘idan ozod etiladi, xodimlar daromad solig‘i esa 7,5% ni tashkil etadi.",
        "Eksportga yo‘naltirilgan kompaniyalar uchun imtiyozlar 2040-yilgacha amal qiladi, chet ellik aksiyadorlarga to‘lanadigan dividendlar esa 2040-yilgacha 5% stavkada soliqqa tortiladi.",
      ],
      ru: [
        "Резидентство IT Park предоставляет IT-компаниям самый благоприятный налоговый режим в стране. Резиденты освобождаются от налога на прибыль, НДС, социального налога и налога с оборота до 2028 года, а налог на доходы сотрудников составляет 7,5%.",
        "Для экспортно-ориентированных компаний льготы действуют до 2040 года, а дивиденды иностранным акционерам облагаются по ставке 5% до 2040 года.",
      ],
      en: [
        "IT Park residency gives IT companies the most favorable tax regime in the country. Residents are exempt from corporate income tax, VAT, social tax and turnover tax until 2028, and employee income tax is 7.5%.",
        "For export-oriented companies the incentives run through 2040, and dividends paid to foreign shareholders are taxed at 5% until 2040.",
      ],
    },
    benefits: {
      uz: [
        "2028-yilgacha asosiy soliqlardan ozodlik",
        "Xodimlar uchun 7,5% daromad solig‘i",
        "Eksportchilar uchun 2040-yilgacha imtiyozlar",
        "IT Park xizmatlari va dasturlariga to‘liq kirish",
      ],
      ru: [
        "Освобождение от основных налогов до 2028 года",
        "Налог на доходы сотрудников 7,5%",
        "Льготы для экспортёров до 2040 года",
        "Полный доступ к сервисам и программам IT Park",
      ],
      en: [
        "Exemption from major taxes until 2028",
        "7.5% income tax for employees",
        "Incentives for exporters through 2040",
        "Full access to IT Park services and programs",
      ],
    },
    eligibility: {
      uz: [
        "IT va dasturiy ta’minot sohasida faoliyat yurituvchi kompaniya",
        "IT Park rezidentlik mezonlariga muvofiqlik",
      ],
      ru: [
        "Компания, работающая в сфере IT и ПО",
        "Соответствие критериям резидентства IT Park",
      ],
      en: [
        "A company operating in IT and software",
        "Meeting IT Park residency criteria",
      ],
    },
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
