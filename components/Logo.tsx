import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

/**
 * Brand-compliant logo lockup.
 * Per the logobook, the logo must not be stretched, recolored, reversed,
 * placed on a green/busy background, rearranged or renamed.
 *
 * - On light backgrounds we use the full-color Sirdaryo logo.
 * - On the dark footer we place the same approved logo inside a clean white
 *   chip (white background is an approved variant) to preserve its integrity.
 */
export function Logo({
  locale,
  variant = "light",
  className = "",
}: {
  locale: Locale;
  variant?: "light" | "dark";
  className?: string;
}) {
  const img = (
    <Image
      src="/brand/logo-syrdarya-transparent.png"
      alt="IT Park Sirdaryo"
      width={1880}
      height={836}
      priority
      className="h-10 w-auto sm:h-11"
    />
  );

  return (
    <Link
      href={`/${locale}`}
      aria-label="IT Park Sirdaryo — home"
      className={`inline-flex shrink-0 items-center ${className}`}
    >
      {variant === "dark" ? (
        <span className="inline-flex items-center rounded-xl bg-white px-3 py-2 shadow-soft">
          {img}
        </span>
      ) : (
        img
      )}
    </Link>
  );
}
