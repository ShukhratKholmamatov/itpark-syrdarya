import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <Image src="/brand/mark-192.png" alt="" width={72} height={72} className="opacity-80" />
      <h1 className="mt-6 text-6xl font-black text-ink">404</h1>
      <p className="mt-2 text-ink-muted">Page not found.</p>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
