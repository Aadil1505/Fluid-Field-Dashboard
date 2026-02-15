"use client";

import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { useState } from "react";

const faqItems = [
  {
    id: "item-1",
    question: "Can I cancel my MotionDesk subscription anytime?",
    answer:
      "Yes. You can cancel any time from your dashboard using Manage license, then opening the Polar customer portal. Your access stays active until the end of the current billing period.",
  },
  {
    id: "item-2",
    question: "What happens after I purchase?",
    answer:
      "You are redirected back to MotionDesk, where your dashboard shows your active plan and license key. If processing takes a moment, refresh the page and it will appear shortly.",
  },
  {
    id: "item-3",
    question: "Do I need an account before checkout?",
    answer:
      "If you are not signed in, clicking a paid plan takes you through sign up/sign in first, then continues to the exact plan you selected.",
  },
  {
    id: "item-4",
    question: "What is included in the free version?",
    answer:
      "Free includes core features and selected themes. Paid plans unlock all premium themes, full access, and ongoing updates.",
  },
  {
    id: "item-5",
    question: "Do you offer monthly and lifetime plans?",
    answer:
      "Yes. Choose monthly for flexibility or lifetime for one-time purchase access. Both are managed from your dashboard.",
  },
];

export default function FAQs() {
  const [openItem, setOpenItem] = useState<string>("item-1");

  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-secondary-foreground">
            Quick answers about billing, cancellation, and getting started.
          </p>
        </div>

        <LiquidGlassCard
          glassSize="lg"
          className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border/60 bg-linear-to-br from-primary-foreground to-bg-card shadow-xl"
        >
          <div className="space-y-2">
            {faqItems.map((item, index) => {
              const isOpen = openItem === item.id;

              return (
                <div key={item.id}>
                  <button
                    type="button"
                    onClick={() => setOpenItem(isOpen ? "" : item.id)}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors hover:bg-foreground/5"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-content`}
                  >
                    <span className="text-base font-medium">{item.question}</span>
                    <span className="ml-4 text-muted-foreground">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`${item.id}-content`}
                      className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground"
                    >
                      {item.answer}
                    </div>
                  )}

                  {index < faqItems.length - 1 && (
                    <div className="mx-4 h-px bg-linear-to-r from-transparent via-border to-transparent" />
                  )}
                </div>
              );
            })}
          </div>

        </LiquidGlassCard>
      </div>
    </section>
  );
}
