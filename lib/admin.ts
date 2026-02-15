const ADMIN_SPLIT_PATTERN = /[,;\s]+/;

export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "";
  return raw
    .split(ADMIN_SPLIT_PATTERN)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return getAdminEmails().includes(normalized);
}
