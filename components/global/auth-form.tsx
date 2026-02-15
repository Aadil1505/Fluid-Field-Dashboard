"use client";

import {
  LiquidGlassCard
} from "@/components/kokonutui/liquid-glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import type { PolarCheckoutSlug } from "@/lib/polar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

export default function AuthForm({
  mode,
  checkoutSlug,
}: {
  mode: "sign-in" | "sign-up";
  checkoutSlug?: PolarCheckoutSlug;
}) {
  const router = useRouter();
  const isSignUp = mode === "sign-up";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await authClient.signUp.email({
          name,
          email,
          password,
        });
        if (error) {
          setError(error.message ?? "Sign up failed");
          return;
        }
      } else {
        const { error } = await authClient.signIn.email({
          email,
          password,
        });
        if (error) {
          setError(error.message ?? "Sign in failed");
          return;
        }
      }

      if (checkoutSlug) {
        const { error } = await authClient.checkout({
          slug: checkoutSlug,
        });
        if (error) {
          setError(error.message ?? "Unable to start checkout");
          return;
        }
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-40">
      <LiquidGlassCard className="w-full max-w-sm rounded-3xl border border-border/60 bg-linear-to-br from-background to-secondary shadow-xl">
        <div className="mb-6">
          <h2 className="font-semibold text-2xl text-foreground">
            {isSignUp ? "Create account" : "Welcome back"}
          </h2>
          <p className="mt-1 text-sm text-secondary-foreground">
            {isSignUp
              ? "Enter your details to get started."
              : "Sign in to your account."}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="border-border bg-background/50 backdrop-blur-sm"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="border-border bg-background/50 backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={8}
              className="border-border bg-background/50 backdrop-blur-sm"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <div className="flex flex-col gap-4 pt-2">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? isSignUp
                  ? "Creating account..."
                  : "Signing in..."
                : isSignUp
                  ? "Create account"
                  : "Sign in"}
            </Button>
            <p className="text-center text-sm text-secondary-foreground">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <Link
                    href={checkoutSlug ? `/auth/sign-in?checkout=${encodeURIComponent(checkoutSlug)}` : "/auth/sign-in"}
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <Link
                    href={checkoutSlug ? `/auth/sign-up?checkout=${encodeURIComponent(checkoutSlug)}` : "/auth/sign-up"}
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </p>
          </div>
        </form>
      </LiquidGlassCard>
    </div>
  );
}
