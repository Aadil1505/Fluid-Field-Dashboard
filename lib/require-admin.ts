import { auth } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  if (!isAdminEmail(session.user.email)) {
    redirect("/dashboard");
  }

  return session;
}
