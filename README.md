# IT Park Sirdaryo — Website & Admin Panel

Official multi-page website for **IT Park Sirdaryo**, the regional branch of
**IT Park Uzbekistan** in the Sirdaryo region. Trilingual (O‘zbekcha / Русский / English),
with an admin panel for news and a Telegram bot integration for form submissions.

Built strictly to the **IT Park Uzbekistan Logobook (2024)**:
green `#7DBA28`, dark `#1E1E1E`, light gray `#D9D9D9`, Gilroy typeface, and the
Sirdaryo logo used per brand rules (no stretching, recoloring, reversing, green/busy backgrounds, etc.).

---

## ✨ Features

| Area | Details |
|------|---------|
| **Home** | Hero + building photo, about IT Park Sirdaryo, IT Park Uzbekistan parent-org section, stats, programs teaser, latest news, CTAs |
| **Programs** | Zero Risk, Local2Global (Zero to Global), Digital Startups, Soft Landing, IT Visa, IT Park Residency — each with a full detail page |
| **Zero Risk application** | Form (full name, contact, company, message) → saved to DB **and** sent to a Telegram group |
| **Careers (youth → international companies)** | Form + **CV upload** → saved to DB **and** CV sent to a second Telegram group |
| **News** | Public news list + article pages; written from the admin panel in 3 languages |
| **Team** | Management team cards with photo, role and contacts |
| **Gallery** | Masonry gallery with lightbox, from real IT Park Sirdaryo photos |
| **Admin panel** | Secure login, create/edit/delete news (with cover image), view all form submissions |
| **i18n** | UZ / RU / EN with a language switcher and locale-prefixed URLs |

---

## 🧱 Tech stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS** (brand design tokens)
- **Prisma** ORM + **SQLite** (zero-config local DB; swappable for Postgres/MySQL)
- **Telegram Bot API** (plain `fetch`, no extra dependency)
- **jose** (signed admin session cookie) + **bcryptjs** (password hashing)

---

## 🚀 Getting started

### 1. Prerequisites
- Node.js 18.18+ (tested on Node 24)

### 2. Install
```bash
npm install
```

### 3. Configure environment
Copy the example and fill it in:
```bash
cp .env.example .env
```
A ready-to-run `.env` is already included for local development. Edit the values
(especially `ADMIN_PASSWORD`, `AUTH_SECRET`, and the Telegram settings) before deploying.

### 4. Set up the database
```bash
npm run db:push     # create the SQLite schema
npm run db:seed     # create the admin user + a welcome news post
```

### 5. Run
```bash
npm run dev         # development  → http://localhost:3000
# or
npm run build && npm start   # production
```

The site is at `http://localhost:3000` (redirects to `/uz`).
The admin panel is at `http://localhost:3000/admin`.

**Default admin login** (from `.env`): `admin` / `itpark-sirdaryo-2026` — **change this**.

---

## 🤖 Telegram bot setup

Form submissions are delivered to **two separate Telegram groups**:
- Zero Risk applications → `TELEGRAM_ZERO_RISK_CHAT_ID`
- Career / CV submissions → `TELEGRAM_CAREERS_CHAT_ID`

### Steps
1. **Create a bot:** message [@BotFather](https://t.me/BotFather) → `/newbot` → copy the token into `TELEGRAM_BOT_TOKEN`.
2. **Create two groups** (e.g. “IT Park Sirdaryo — Zero Risk” and “… — CV”).
3. **Add your bot** to each group as a member (and allow it to post).
4. **Get each group's chat ID:**
   - Add [@getidsbot](https://t.me/getidsbot) or [@RawDataBot](https://t.me/RawDataBot) to the group — it prints the chat ID (groups look like `-1001234567890`). Then remove it.
   - *Or* send a message in the group and open
     `https://api.telegram.org/bot<TOKEN>/getUpdates` to read `chat.id`.
5. Paste the IDs into `.env`:
   ```env
   TELEGRAM_BOT_TOKEN="123456:ABC..."
   TELEGRAM_ZERO_RISK_CHAT_ID="-1001111111111"
   TELEGRAM_CAREERS_CHAT_ID="-1002222222222"
   ```
6. Restart the server.

> If Telegram isn't configured, submissions are still **saved to the database** and
> viewable in the admin panel under *Submissions* — nothing is lost. The `delivered`
> flag shows whether the Telegram send succeeded.

---

## 🛠 Things to customize before going live

- **Team page** — `lib/content/team.ts` holds **placeholder** names, roles, photos and contacts.
  Replace them and drop real photos into `public/images/team/`.
- **Contacts** — footer email/phone/socials in `components/Footer.tsx`; team contacts in `lib/content/team.ts`.
- **Gilroy font** — the real Gilroy is licensed, so it is **not** bundled (the site falls back to
  Manrope, a close match). To use real Gilroy, drop these files into `public/fonts/gilroy/`:
  `Gilroy-Regular.woff2`, `Gilroy-Medium.woff2`, `Gilroy-SemiBold.woff2`,
  `Gilroy-Bold.woff2`, `Gilroy-ExtraBold.woff2`, `Gilroy-Heavy.woff2`.
  They are picked up automatically (see `app/globals.css`).
- **Program content** — `lib/content/programs.ts` (trilingual). Figures are based on public
  IT Park Uzbekistan information (2026) and should be reviewed/updated periodically.

---

## 📁 Project structure

```
app/
  [locale]/            # public, locale-prefixed pages (uz | ru | en)
    page.tsx           # home
    programs/          # list + [slug] detail
    zero-risk/         # Zero Risk application form
    careers/           # CV submission form
    news/              # list + [slug] article
    team/  gallery/
  admin/               # login, dashboard, news editor, submissions
  api/
    zero-risk/route.ts # POST → DB + Telegram
    careers/route.ts   # POST (multipart, CV) → DB + Telegram
components/            # Header, Footer, forms, cards, gallery, admin UI
lib/
  content/             # programs, team, gallery data
  dictionaries/        # uz.ts / ru.ts / en.ts translations
  db.ts auth.ts telegram.ts utils.ts actions.ts i18n.ts
prisma/
  schema.prisma  seed.ts
public/
  brand/   images/  fonts/  uploads/   # logos, photos, fonts, user uploads
assets/                # original high-res source assets + logobook
```

---

## 🌐 Deployment notes

- SQLite is great for a single server. For multi-instance hosting, switch the
  Prisma `datasource` to PostgreSQL/MySQL and set `DATABASE_URL`.
- `public/uploads/` (news covers + CVs) must be on **persistent storage** — on
  ephemeral platforms (e.g. Vercel) use external storage (S3/R2) or a VM/VPS.
- Always set a strong `AUTH_SECRET` and `ADMIN_PASSWORD` in production.

---

*A regional branch of IT Park Uzbekistan — building the digital future of the Sirdaryo region.*
