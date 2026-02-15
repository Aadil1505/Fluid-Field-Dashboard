import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6">
      <LiquidGlassCard
        glassSize="lg"
        className="max-w-md w-full rounded-3xl border border-border/60 bg-linear-to-br from-primary-foreground to-bg-card shadow-xl text-center"
      >
        <div className="flex flex-col items-center gap-6">
          <p className="text-8xl font-bold tracking-tighter text-foreground/10 select-none sm:text-9xl">
            404
          </p>

          <div className="h-px w-2/3 bg-linear-to-r from-transparent via-border to-transparent" />

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Page not found
            </h1>
            <p className="text-sm text-secondary-foreground">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/20 px-6 py-2.5 text-sm font-medium text-foreground backdrop-blur-[2px] transition-colors hover:bg-foreground/5"
          >
            Back to home
          </Link>
        </div>
      </LiquidGlassCard>
    </div>
  );
}
