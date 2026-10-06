import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { PostForm } from "@/components/admin/PostForm";

export default async function NewPostPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-mist-light">
      <AdminTopbar name={session.name} active="news" />
      <main className="mx-auto max-w-3xl px-5 py-8">
        <PostForm />
      </main>
    </div>
  );
}
