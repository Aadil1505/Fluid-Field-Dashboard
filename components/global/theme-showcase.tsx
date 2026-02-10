"use client";

import { motion } from "motion/react";

const themes = [
  { name: "Weather Field", file: "weather" },
  { name: "Contour Field", file: "contour" },
  { name: "Smoke Field", file: "smoke" },
  { name: "Magnetic Field", file: "magnetic" },
  { name: "Glyph Swarm", file: "glyph" },
  { name: "ASCII Field", file: "ascii" },
  { name: "Pulse Rings", file: "pulse" },
];

export default function ThemeShowcase() {
  return (
    <section id="showcase" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-bold tracking-tight"
        >
          7 themes. Infinite moods.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-center text-muted-foreground"
        >
          Each one is a real-time physics simulation rendered on your GPU.
        </motion.p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme, i) => (
            <motion.div
              key={theme.file}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted/30"
            >
              {/* Replace src with actual video/gif paths when assets are added */}
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                {theme.name}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <span className="text-sm font-medium text-white">
                  {theme.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
