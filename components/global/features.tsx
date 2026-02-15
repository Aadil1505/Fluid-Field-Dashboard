"use client";

import { motion } from "motion/react";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import {
  Monitor,
  MousePointerClick,
  Cpu,
  Palette,
  Zap,
  SlidersHorizontal,
  Keyboard,
  AppWindow,
  Film,
  KeyRound,
} from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Multi-display support",
    description: "Seamlessly spans across all your screens.",
  },
  {
    icon: MousePointerClick,
    title: "Cursor-responsive physics",
    description: "Every theme reacts to your mouse in real time.",
  },
  {
    icon: Cpu,
    title: "GPU-accelerated",
    description: "Metal-powered rendering. Silky smooth, battery-friendly.",
  },
  {
    icon: Palette,
    title: "10+ distinct themes",
    description: "Customize your vibe from weather fields to glyph swarms.",
  },
  {
    icon: Zap,
    title: "Autopilot mode",
    description: "Sit back and let the wallpaper animate itself.",
  },
  {
    icon: SlidersHorizontal,
    title: "Granular customization",
    description: "Fine-tune colors, speed, density, and more.",
  },
  {
    icon: Keyboard,
    title: "Global pause shortcut",
    description: "Pause or resume wallpapers instantly from anywhere on macOS.",
  },
  {
    icon: Monitor,
    title: "Per-display controls",
    description: "Enable or disable MotionDesk on specific monitors individually.",
  },
  {
    icon: Film,
    title: "Video wallpaper mode",
    description: "Use your own videos as animated wallpapers with playback controls.",
  },
  {
    icon: AppWindow,
    title: "Menu bar quick controls",
    description: "Switch themes, toggle autopilot, and change appearance from the menu bar.",
  },
  {
    icon: KeyRound,
    title: "License key activation",
    description: "Secure activation and validation flow with account-linked licensing.",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-bold tracking-tight"
        >
          Built For Your Mac
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-center text-secondary-foreground"
        >
          A wallpaper engine for your Mac that actually feels good.
        </motion.p>

        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="w-full max-w-sm sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)]"
            >
              <LiquidGlassCard
                glassSize="lg"
                className="h-full rounded-3xl border border-border/60 bg-linear-to-br from-primary-foreground to-bg-card shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <feature.icon className="size-5 text-foreground" />
                  </div>
                  <h3 className="font-extrabold">{feature.title}</h3>
                  <p className="text-sm text-secondary-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
