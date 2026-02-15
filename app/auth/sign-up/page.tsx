import AuthForm from "@/components/global/auth-form";

type AuthPageProps = {
  searchParams?: Promise<{
    checkout?: string | string[];
  }>;
};

function getCheckoutSlug(value: string | string[] | undefined): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

export default async function SignUpPage({ searchParams }: AuthPageProps) {
  const params = (await searchParams) ?? {};
  const checkoutSlug = getCheckoutSlug(params.checkout);

  return <AuthForm mode="sign-up" checkoutSlug={checkoutSlug} />;
}
