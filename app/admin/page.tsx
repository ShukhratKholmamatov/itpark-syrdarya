import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { deletePostAction } from "@/lib/actions";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const posts = await prisma.newsPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  const zeroRiskCount = await prisma.zeroRiskApplication.count();
  const careerCount = await prisma.careerApplication.count();

  return (
    <div className="min-h-screen bg-mist-light">
      <AdminTopbar name={session.name} active="news" />
      <main className="mx-auto max-w-6xl px-5 py-8">
        {/* Stat cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="card p-5">
            <p className="text-sm text-ink-muted">News posts</p>
            <p className="mt-1 text-3xl font-black text-ink">{posts.length}</p>
          </div>
          <Link href="/admin/submissions/zero-risk" className="card p-5 transition hover:shadow-card">
            <p className="text-sm text-ink-muted">Zero Risk applications</p>
            <p className="mt-1 text-3xl font-black text-brand-600">{zeroRiskCount}</p>
          </Link>
          <Link href="/admin/submissions/careers" className="card p-5 transition hover:shadow-card">
            <p className="text-sm text-ink-muted">CV / Career submissions</p>
            <p className="mt-1 text-3xl font-black text-brand-600">{careerCount}</p>
          </Link>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-ink">News posts</h1>
          <Link href="/admin/news/new" className="btn-primary">
            + New post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="card px-6 py-16 text-center text-ink-muted">
            No posts yet. Create your first news post.
          </div>
        ) : (
          <div className="card divide-y divide-ink/5 overflow-hidden">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center gap-4 p-4">
                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-mist-light">
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt="" width={160} height={112} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Image src="/brand/mark-192.png" alt="" width={28} height={28} className="opacity-30" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-ink">{post.titleEn || post.titleUz}</p>
                  <p className="text-xs text-ink-muted">
                    {formatDate(post.publishedAt, "en")} ·{" "}
                    <span className={post.published ? "text-brand-600" : "text-ink-muted"}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link href={`/admin/news/${post.id}/edit`} className="btn-outline px-4 py-2 text-xs">
                    Edit
                  </Link>
                  <form action={deletePostAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <button
                      type="submit"
                      className="btn px-4 py-2 text-xs text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
