"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import DownloadButton from "@/components/global/download-button";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import {
  Palette,
  Sparkles,
  DollarSign,
  Home,
  User,
  CircleHelp,
} from "lucide-react";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const [showDownload, setShowDownload] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowDownload(latest > 630);
  });

  const navItems = useMemo(
    () => [
      { name: "Home", link: "/#home", icon: <Home className="size-4" /> },
      { name: "Themes", link: "/#showcase", icon: <Palette className="size-4" /> },
      { name: "Features", link: "/#features", icon: <Sparkles className="size-4" /> },
      { name: "Pricing", link: "/#pricing", icon: <DollarSign className="size-4" /> },
      { name: "FAQ", link: "/#faq", icon: <CircleHelp className="size-4" /> },
    ],
    []
  );

  return (
    <>
      <FloatingNav
        navItems={navItems}
        themeSlot={
          <AnimatedThemeToggler className="text-secondary-foreground hover:text-secondary-foreground/80 p-2 rounded-full hover:bg-muted transition-colors [&>svg]:size-4" />
        }
        authSlot={
          <Link
            href={session ? "/dashboard" : "/auth/sign-in"}
            className="flex items-center justify-center size-8 rounded-full text-secondary-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <User className="size-4" />
          </Link>
        }
      />

      <AnimatePresence>
        {showDownload && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none fixed inset-x-0 bottom-10 hidden sm:flex items-center justify-end px-6 z-5000 sm:px-10"
          >
            <div className="pointer-events-auto flex items-center gap-2">
              <DownloadButton source="navbar_floating" />
              <button
                onClick={() => setDismissed(true)}
                className="flex items-center justify-center size-8 rounded-full bg-muted/80 text-secondary-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Dismiss download button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
