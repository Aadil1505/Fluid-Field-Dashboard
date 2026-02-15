import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { POLAR_PRODUCTS } from "@/lib/polar";
import { checkout, polar, portal, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

const client = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: (process.env.POLAR_ENVIRONMENT as "sandbox" | "production") ?? "sandbox",
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: schema
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    polar({
      client,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: POLAR_PRODUCTS.monthly.productId,
              slug: POLAR_PRODUCTS.monthly.slug,
            },
            {
              productId: POLAR_PRODUCTS.lifetime.productId,
              slug: POLAR_PRODUCTS.lifetime.slug,
            },
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,
        }),
      ],
    }),
    nextCookies(),
  ],
});
