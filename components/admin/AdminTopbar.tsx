import Link from "next/link";
import Image from "next/image";
import { logoutAction } from "@/lib/actions";

export function AdminTopbar({
  name,
  active,
}: {
  name: string;
  active: "news" | "zero-risk" | "careers";
}) {
  const tabs = [
    { key: "news", label: "News", href: "/admin" },
    { key: "zero-risk", label: "Zero Risk", href: "/admin/submissions/zero-risk" },
    { key: "careers", label: "CV / Careers", href: "/admin/submissions/careers" },
  ] as const;

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/brand/mark-192.png" alt="" width={32} height={32} className="h-8 w-8" />
            <span className="text-sm font-extrabold text-ink">Admin</span>
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {tabs.map((tab) => (
              <Link
                key={tab.key}
                href={tab.href}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  active === tab.key
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-muted hover:bg-mist-light hover:text-ink"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="hidden text-sm font-semibold text-ink-muted hover:text-brand sm:inline">
            View site ↗
          </Link>
          <span className="text-sm font-semibold text-ink">{name}</span>
          <form action={logoutAction}>
            <button type="submit" className="btn-outline px-4 py-2 text-xs">
              Sign out
            </button>
          </form>
        </div>
      </div>
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-ink/5 px-5 py-2 sm:hidden">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition ${
              active === tab.key ? "bg-brand-50 text-brand-700" : "text-ink-muted"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
