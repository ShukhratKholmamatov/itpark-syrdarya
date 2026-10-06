import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ZeroRiskSubmissions() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const items = await prisma.zeroRiskApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-mist-light">
      <AdminTopbar name={session.name} active="zero-risk" />
      <main className="mx-auto max-w-6xl px-5 py-8">
        <h1 className="mb-5 text-xl font-extrabold text-ink">
          Zero Risk applications ({items.length})
        </h1>
        {items.length === 0 ? (
          <div className="card px-6 py-16 text-center text-ink-muted">No submissions yet.</div>
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink/10 text-xs uppercase tracking-wider text-ink-muted">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Sent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {items.map((it) => (
                  <tr key={it.id} className="align-top">
                    <td className="whitespace-nowrap p-4 text-ink-muted">
                      {formatDate(it.createdAt, "en")}
                    </td>
                    <td className="p-4 font-semibold text-ink">{it.fullName}</td>
                    <td className="p-4 text-ink-soft">{it.companyName}</td>
                    <td className="p-4 text-ink-soft">{it.contact}</td>
                    <td className="max-w-xs p-4 text-ink-muted">{it.message || "—"}</td>
                    <td className="p-4">
                      <span className={it.delivered ? "text-brand-600" : "text-ink-muted"}>
                        {it.delivered ? "✓ TG" : "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
