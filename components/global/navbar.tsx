"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Palette, Sparkles, DollarSign, LayoutDashboard, Home } from "lucide-react";
import { Button } from "../ui/button";

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
      themeSlot={
        <AnimatedThemeToggler className="text-muted-foreground hover:text-muted-foreground/80 p-2 rounded-full hover:bg-muted transition-colors [&>svg]:size-4" />
      }
      authSlot={
        session ? (
          <Button
            variant={"ghost"}
            onClick={() => authClient.signOut()}
            // className="border text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full hover:bg-muted/50 transition-colors"
            className="border rounded-full text-sm font-medium text-muted-foreground"
          >
            Sign out
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-linear-to-r from-transparent via-blue-500 to-transparent h-px" />

          </Button>
        ) : (
          <Link
            href="/auth/sign-in"
            className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full hover:bg-muted/50 transition-colors"
          >
            Sign in
          </Link>
        )
      }
    />
  );
}
