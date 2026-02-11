import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { checkout, polar, portal, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

const client = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox",
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
              productId: "6fd998c2-d456-442d-b2a6-0b9c29c0ca7b",
              slug: "Fluid-Field-Monthly", // Custom slug for easy reference in Checkout URL, e.g. /checkout/Fluid-Field
            },
            {
              productId: "a9ae9cbc-cf34-4119-bdce-439dec938363",
              slug: "Fluid-Field-Lifetime", // Custom slug for easy reference in Checkout URL, e.g. /checkout/Fluid-Field
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
