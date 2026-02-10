"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl text-5xl font-bold tracking-tight sm:text-6xl"
      >
        Your desktop, alive.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-6 max-w-lg text-lg text-muted-foreground"
      >
        GPU-accelerated live wallpapers for macOS. 7 physics-driven themes that
        react to your cursor, span every display, and never skip a frame.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex gap-4"
      >
        <Button size="lg" asChild>
          <Link href="#pricing">
            Get FluidField
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="#showcase">Watch it move</Link>
        </Button>
      </motion.div>
    </section>
  );
}
