"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Palette, Sparkles, DollarSign, LayoutDashboard, Home } from "lucide-react";

export default function Navbar() {
  const { data: session } = authClient.useSession();

  const navItems = [
    { name: "Home", link: "/", icon: <Home className="size-4" /> },
    { name: "Themes", link: "/#showcase", icon: <Palette className="size-4" /> },
    { name: "Features", link: "/#features", icon: <Sparkles className="size-4" /> },
    { name: "Pricing", link: "/#pricing", icon: <DollarSign className="size-4" /> },
    ...(session
      ? [{ name: "Dashboard", link: "/dashboard", icon: <LayoutDashboard className="size-4" /> }]
      : []),
  ];

  return (
    <FloatingNav
      navItems={navItems}
      authSlot={
        session ? (
          <button
            onClick={() => authClient.signOut()}
            className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
          >
            <span>Sign out</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        ) : (
          <Link
            href="/auth/sign-in"
            className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
          >
            <span>Sign in</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </Link>
        )
      }
    />
  );
}
