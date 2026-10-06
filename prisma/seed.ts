import bcrypt from "bcryptjs";
import { createPrisma } from "../lib/db";

async function main() {
  const prisma = createPrisma();
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin12345";

  const hash = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { username },
    update: { password: hash },
    create: { username, password: hash, name: "Administrator" },
  });
  console.log(`✅ Admin user ready: "${username}"`);

  const count = await prisma.newsPost.count();
  if (count === 0) {
    await prisma.newsPost.create({
      data: {
        slug: "welcome-to-it-park-sirdaryo",
        titleUz: "IT Park Sirdaryoga xush kelibsiz!",
        titleRu: "Добро пожаловать в IT Park Сырдарья!",
        titleEn: "Welcome to IT Park Sirdaryo!",
        excerptUz:
          "O‘zbekiston IT Parkning Sirdaryo viloyatidagi hududiy filiali rasmiy veb-sayti ishga tushdi.",
        excerptRu:
          "Запущен официальный сайт регионального филиала IT Park Uzbekistan в Сырдарьинской области.",
        excerptEn:
          "The official website of the IT Park Uzbekistan regional branch in the Sirdaryo region is now live.",
        bodyUz:
          "IT Park Sirdaryo rasmiy veb-sayti ishga tushganini mamnuniyat bilan e’lon qilamiz.\n\nUshbu platforma orqali siz dasturlarimiz, yangiliklarimiz, jamoamiz va imkoniyatlarimiz haqida bilib olasiz. Zero Risk dasturiga ariza berishingiz yoki xalqaro karyera uchun CV yuborishingiz mumkin.\n\nKeling, Sirdaryoning raqamli kelajagini birga quramiz!",
        bodyRu:
          "С радостью сообщаем о запуске официального сайта IT Park Сырдарья.\n\nЗдесь вы узнаете о наших программах, новостях, команде и возможностях. Вы можете подать заявку на программу Zero Risk или отправить резюме для международной карьеры.\n\nДавайте строить цифровое будущее Сырдарьи вместе!",
        bodyEn:
          "We are delighted to announce the launch of the official IT Park Sirdaryo website.\n\nHere you can learn about our programs, news, team and opportunities. You can apply for the Zero Risk program or submit your CV for an international career.\n\nLet’s build the digital future of Sirdaryo together!",
        published: true,
      },
    });
    console.log("✅ Seeded welcome news post");
  } else {
    console.log("ℹ️  News posts already exist — skipping welcome post.");
  }

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  process.exit(1);
});
