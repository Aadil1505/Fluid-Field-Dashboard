"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
          <CheckCircle className="size-8 text-foreground" />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          You&apos;re in.
        </h1>
        <p className="mt-3 max-w-sm text-secondary-foreground">
          MotionDesk is yours. Head to your dashboard to grab your license key
          and download the app.
        </p>

        <div className="mt-8 flex gap-4">
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Go to dashboard
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
