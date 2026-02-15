import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db/drizzle";
import { downloadEvent, feedback } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";
import { desc, sql } from "drizzle-orm";

const ROW_LIMIT = 100;

function formatDate(value: string | Date | null | undefined) {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminPage() {
  const session = await requireAdmin();

  const [feedbackCountRes, downloadCountRes, feedbackRows, downloadRows] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(feedback),
    db.select({ count: sql<number>`count(*)` }).from(downloadEvent),
    db.select().from(feedback).orderBy(desc(feedback.createdAt)).limit(ROW_LIMIT),
    db.select().from(downloadEvent).orderBy(desc(downloadEvent.createdAt)).limit(ROW_LIMIT),
  ]);

  const feedbackCount = Number(feedbackCountRes[0]?.count ?? 0);
  const downloadCount = Number(downloadCountRes[0]?.count ?? 0);

  return (
    <section className="px-6 py-36">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Signed in as {session.user.email}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Total feedback submissions</CardTitle>
              <CardDescription>All-time feedback rows</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{feedbackCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total download events</CardTitle>
              <CardDescription>All-time tracked downloads</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{downloadCount}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Latest Feedback</CardTitle>
            <CardDescription>Most recent {ROW_LIMIT} feedback submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr className="border-b">
                    <th className="px-2 py-2 font-medium">When</th>
                    <th className="px-2 py-2 font-medium">Category</th>
                    <th className="px-2 py-2 font-medium">Email</th>
                    <th className="px-2 py-2 font-medium">App Version</th>
                    <th className="px-2 py-2 font-medium">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackRows.map((row) => (
                    <tr key={row.id} className="border-b align-top">
                      <td className="px-2 py-2 whitespace-nowrap">{formatDate(row.createdAt)}</td>
                      <td className="px-2 py-2 capitalize">{row.category}</td>
                      <td className="px-2 py-2 whitespace-nowrap">{row.email ?? "—"}</td>
                      <td className="px-2 py-2 whitespace-nowrap">{row.appVersion ?? "—"}</td>
                      <td className="px-2 py-2 min-w-[24rem]">{row.message}</td>
                    </tr>
                  ))}
                  {feedbackRows.length === 0 && (
                    <tr>
                      <td className="px-2 py-4 text-muted-foreground" colSpan={5}>
                        No feedback yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Latest Download Events</CardTitle>
            <CardDescription>Most recent {ROW_LIMIT} download tracking events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr className="border-b">
                    <th className="px-2 py-2 font-medium">When</th>
                    <th className="px-2 py-2 font-medium">Source</th>
                    <th className="px-2 py-2 font-medium">Email</th>
                    <th className="px-2 py-2 font-medium">Channel</th>
                    <th className="px-2 py-2 font-medium">Version</th>
                    <th className="px-2 py-2 font-medium">Bot</th>
                  </tr>
                </thead>
                <tbody>
                  {downloadRows.map((row) => (
                    <tr key={row.id} className="border-b">
                      <td className="px-2 py-2 whitespace-nowrap">{formatDate(row.createdAt)}</td>
                      <td className="px-2 py-2 whitespace-nowrap">{row.source}</td>
                      <td className="px-2 py-2 whitespace-nowrap">{row.email ?? "—"}</td>
                      <td className="px-2 py-2 whitespace-nowrap">{row.releaseChannel}</td>
                      <td className="px-2 py-2 whitespace-nowrap">{row.appVersion ?? "—"}</td>
                      <td className="px-2 py-2">{row.isBot ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                  {downloadRows.length === 0 && (
                    <tr>
                      <td className="px-2 py-4 text-muted-foreground" colSpan={6}>
                        No download events yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
