import { createAuthClient } from "better-auth/react";
import { polarClient } from "@polar-sh/better-auth/client";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
  plugins: [polarClient()],
});
