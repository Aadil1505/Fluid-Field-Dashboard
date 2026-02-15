import AuthForm from "@/components/global/auth-form";
import { isPolarCheckoutSlug } from "@/lib/polar";
import type { PolarCheckoutSlug } from "@/lib/polar";

type AuthPageProps = {
  searchParams?: Promise<{
    checkout?: string | string[];
  }>;
};

function getCheckoutSlug(value: string | string[] | undefined): PolarCheckoutSlug | undefined {
  const raw = typeof value === "string" ? value : Array.isArray(value) ? value[0] : undefined;
  if (!raw) return undefined;
  return isPolarCheckoutSlug(raw) ? raw : undefined;
}

export default async function SignInPage({ searchParams }: AuthPageProps) {
  const params = (await searchParams) ?? {};
  const checkoutSlug = getCheckoutSlug(params.checkout);

  return <AuthForm mode="sign-in" checkoutSlug={checkoutSlug} />;
}
