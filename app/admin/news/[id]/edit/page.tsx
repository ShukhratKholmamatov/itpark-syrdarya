import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { PostForm } from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const post = await prisma.newsPost.findUnique({ where: { id: Number(id) } });
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-mist-light">
      <AdminTopbar name={session.name} active="news" />
      <main className="mx-auto max-w-3xl px-5 py-8">
        <PostForm
          post={{
            id: post.id,
            coverImage: post.coverImage,
            titleUz: post.titleUz, titleRu: post.titleRu, titleEn: post.titleEn,
            excerptUz: post.excerptUz, excerptRu: post.excerptRu, excerptEn: post.excerptEn,
            bodyUz: post.bodyUz, bodyRu: post.bodyRu, bodyEn: post.bodyEn,
            published: post.published,
          }}
        />
      </main>
    </div>
  );
}
