"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { motion } from "motion/react";

const features = [
  "All 7 visualization themes",
  "Multi-display support",
  "Cursor-responsive physics",
  "GPU-accelerated (Metal)",
  "Autopilot mode",
  "Granular customization",
  "Free updates",
];

export default function Pricing() {
  const handleCheckout = async () => {
    await authClient.checkout({
      slug: "Fluid-Field",
      successUrl: `${window.location.origin}/success`,
    });
  };

  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight">Simple pricing</h2>
          <p className="mt-3 text-muted-foreground">
            One subscription, everything included. Less than a coffee.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 w-full max-w-sm"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl">FluidField</CardTitle>
                <Badge variant="secondary">Monthly</Badge>
              </div>
              <CardDescription>
                Full access to every theme and feature.
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$3.49</span>
                <span className="ml-1 text-muted-foreground">Per Month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="size-4 text-muted-foreground" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Get FluidField
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
