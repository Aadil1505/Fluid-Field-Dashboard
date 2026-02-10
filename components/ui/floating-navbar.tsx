"use client";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import React, { JSX, ReactNode, useRef, useState } from "react";

// Glass shadow effects
const GLASS_SHADOW_LIGHT =
  "shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)]";

const GLASS_SHADOW_DARK =
  "dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]";

const GLASS_SHADOW = `${GLASS_SHADOW_LIGHT} ${GLASS_SHADOW_DARK}`;

// Glass filter SVG component
const GlassFilter = React.memo(({ id }: { id: string }) => (
  <svg className="hidden">
    <title>Glass Effect Filter</title>
    <defs>
      <filter
        colorInterpolationFilters="sRGB"
        height="200%"
        id={id}
        width="200%"
        x="-50%"
        y="-50%"
      >
        <feTurbulence
          baseFrequency="0.05 0.05"
          numOctaves="1"
          result="turbulence"
          seed="1"
          type="fractalNoise"
        />
        <feGaussianBlur in="turbulence" result="blurredNoise" stdDeviation="2" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="blurredNoise"
          result="displaced"
          scale={50}
          xChannelSelector="R"
          yChannelSelector="B"
        />
        <feGaussianBlur in="displaced" result="finalBlur" stdDeviation="4" />
        <feComposite in="finalBlur" in2="finalBlur" operator="over" />
      </filter>
    </defs>
  </svg>
));
GlassFilter.displayName = "GlassFilter";

export const FloatingNav = ({
  navItems,
  authSlot,
  themeSlot,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  authSlot?: ReactNode;
  themeSlot?: ReactNode;
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const filterId = React.useId();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (current) => {
    const direction = current - lastScrollY.current;
    lastScrollY.current = current;

    if (current < 100) {
      setVisible(true);
    } else if (direction < 0) {
      setVisible(true);
    } else if (direction > 1) {
      setVisible(false);
    }
  });

  return (
    <>
      <GlassFilter id={filterId} />
      <AnimatePresence mode="wait">
        <motion.div
          key="floating-nav"
          initial={{
            opacity: 1,
            y: 0,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "group flex max-w-fit fixed top-10 inset-x-0 mx-auto rounded-full bg-background/80 backdrop-blur-[2px] z-5000 px-6 py-2 items-center justify-center space-x-4",
            className
          )}
        >
          {/* Glass shadow overlay */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 rounded-full transition-all",
              GLASS_SHADOW
            )}
          />

          {/* Glass distortion filter */}
          <div
            className="-z-10 pointer-events-none absolute inset-0 isolate overflow-hidden rounded-full"
            style={{ backdropFilter: `url("#${filterId}")` }}
          />

          {/* Hover gradient overlay */}
          <div className="pointer-events-none absolute inset-0 z-20 rounded-full bg-linear-to-r from-transparent via-foreground/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

          {navItems.map((navItem, idx) => (
            <a
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                "relative z-10 items-center flex space-x-1 text-muted-foreground hover:text-foreground transition-colors"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </a>
          ))}
          <div className="relative z-10">{themeSlot}</div>
          <div className="relative z-10">{authSlot}</div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
