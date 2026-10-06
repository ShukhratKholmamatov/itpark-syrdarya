import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "IT Park Sirdaryo",
    template: "%s — IT Park Sirdaryo",
  },
  description:
    "Official website of IT Park Sirdaryo — a regional branch of IT Park Uzbekistan.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/brand/mark-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/brand/mark-192.png",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
