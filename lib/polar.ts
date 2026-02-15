export const POLAR_PRODUCTS = {
  monthly: {
    slug: "motion-desk-monthly",
    productId:
      process.env.POLAR_PRODUCT_ID_MONTHLY!,
  },
  lifetime: {
    slug: "motion-desk-lifetime",
    productId:
      process.env.POLAR_PRODUCT_ID_LIFETIME!,
  },
} as const;

export const POLAR_CHECKOUT_SLUGS = [
  POLAR_PRODUCTS.monthly.slug,
  POLAR_PRODUCTS.lifetime.slug,
] as const;

export type PolarCheckoutSlug = (typeof POLAR_CHECKOUT_SLUGS)[number];

export function isPolarCheckoutSlug(value: string): value is PolarCheckoutSlug {
  return (POLAR_CHECKOUT_SLUGS as readonly string[]).includes(value);
}
