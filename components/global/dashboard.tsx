"use client";

import DownloadButton from "@/components/global/download-button";
import { LiquidGlassCard } from "@/components/kokonutui/liquid-glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import type { CustomerState } from "@polar-sh/sdk/models/components/customerstate.js";
import {
  CalendarDays,
  Check,
  CreditCard,
  ExternalLink,
  Infinity,
  Key,
  Loader2,
  LogOut,
  Package,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type DashboardUser = {
  name?: string | null;
  email: string;
};

type DashboardPageProps = {
  user: DashboardUser;
};

type AnyRecord = Record<string, unknown>;

const ACTIVE_SUBSCRIPTION_STATUSES = new Set(["active", "trialing"]);

function toDateInput(value: Date | null | undefined): string | Date | null | undefined {
  if (value === null || value === undefined) return value;
  if (typeof value === "string" || value instanceof Date) return value;
  return undefined;
}

function getLicenseKey(customerState: CustomerState | null): string | undefined {
  const grantedBenefits = customerState?.grantedBenefits ?? [];
  const licenseKeyBenefit = grantedBenefits.find((benefit) => benefit.benefitType === "license_keys");
  const properties = (licenseKeyBenefit?.properties ?? null) as AnyRecord | null;
  if (!properties) return undefined;

  const displayKey = properties.displayKey;
  if (typeof displayKey === "string") return displayKey;

  const licenseKey = properties.licenseKey;
  if (typeof licenseKey === "string") return licenseKey;

  return undefined;
}

function normalizeCustomerState(customerState: CustomerState | null) {
  const activeSubscriptions = (customerState?.activeSubscriptions ?? [])
    .filter((subscription) => ACTIVE_SUBSCRIPTION_STATUSES.has(subscription.status))
    .sort(
      (a, b) =>
        new Date(b.currentPeriodStart).getTime() -
        new Date(a.currentPeriodStart).getTime(),
    );

  const primarySubscription = activeSubscriptions[0] ?? null;
  const grantedBenefits = customerState?.grantedBenefits ?? [];

  const hasActiveSubscription = activeSubscriptions.length > 0;
  const hasGrantedBenefits = grantedBenefits.length > 0;
  const hasLifetime = hasGrantedBenefits && !hasActiveSubscription;
  const hasActivePurchase = hasActiveSubscription || hasGrantedBenefits;

  return {
    hasActivePurchase,
    hasLifetime,
    licenseKey: getLicenseKey(customerState),
    sub: primarySubscription,
    subAmount: primarySubscription?.amount,
    subCurrency: primarySubscription?.currency ?? "usd",
    subInterval: primarySubscription?.recurringInterval,
    subPeriodStart: toDateInput(primarySubscription?.currentPeriodStart),
    subPeriodEnd: toDateInput(primarySubscription?.currentPeriodEnd),
    subStartedAt: toDateInput(primarySubscription?.startedAt),
    subStatus: primarySubscription?.status,
  };
}

function formatDate(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatAmount(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

export default function DashboardPage({ user }: DashboardPageProps) {
  const router = useRouter();
  const [customerState, setCustomerState] = useState<CustomerState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    authClient.customer
      .state()
      .then(({ data }) => {
        if (!active) return;
        setCustomerState(data ?? null);
      })
      .catch(() => {
        if (!active) return;
        setCustomerState(null);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handlePortal = async () => {
    const { data } = await authClient.customer.portal();
    if (data?.url) {
      window.location.href = data.url;
    }
  };

  const {
    hasActivePurchase,
    hasLifetime,
    licenseKey,
    sub,
    subAmount,
    subCurrency,
    subInterval,
    subPeriodStart,
    subPeriodEnd,
    subStartedAt,
    subStatus,
  } = useMemo(() => normalizeCustomerState(customerState), [customerState]);

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-secondary-foreground" />
      </div>
    );
  }

  return (
    <section className="px-6 py-40">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="mt-2 text-secondary-foreground">
                Welcome back, {user.name || user.email}.
              </p>
              <p className="text-sm text-secondary-foreground/80">{user.email}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: { onSuccess: () => router.push("/") },
                })
              }
              className="rounded-full"
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 space-y-6"
        >
          <LiquidGlassCard
            glassSize="lg"
            className="rounded-3xl border border-border/60 bg-linear-to-br from-primary-foreground to-bg-card shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="size-5" />
                  <h3 className="text-xl font-semibold text-foreground">MotionDesk</h3>
                </div>
                <Badge variant={hasActivePurchase ? "default" : "secondary"}>
                  {hasActivePurchase ? (hasLifetime && !sub ? "Lifetime" : "Active") : "No purchase"}
                </Badge>
              </div>
              <p className="text-sm text-secondary-foreground">
                {hasActivePurchase
                  ? hasLifetime && !sub
                    ? "You have lifetime access. Enjoy all themes and features forever."
                    : "Your license is active. You have full access to all themes and features."
                  : "You haven't purchased MotionDesk yet."}
              </p>
            </div>

            {hasActivePurchase && sub && (
              <>
                <div className="my-6 h-px bg-linear-to-r from-transparent via-border to-transparent" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-secondary-foreground">
                      <CreditCard className="size-3.5" />
                      Amount
                    </div>
                    <p className="font-medium text-foreground">
                      {subAmount !== undefined
                        ? `${formatAmount(subAmount, subCurrency)} / ${subInterval ?? "month"}`
                        : "—"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-secondary-foreground">
                      <RefreshCw className="size-3.5" />
                      Status
                    </div>
                    <p className="font-medium capitalize text-foreground">{subStatus ?? "—"}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-secondary-foreground">
                      <CalendarDays className="size-3.5" />
                      Current period
                    </div>
                    <p className="font-medium text-foreground">
                      {formatDate(subPeriodStart)} — {formatDate(subPeriodEnd)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-secondary-foreground">
                      <CalendarDays className="size-3.5" />
                      Subscribed since
                    </div>
                    <p className="font-medium text-foreground">{formatDate(subStartedAt)}</p>
                  </div>
                </div>
              </>
            )}

            {hasActivePurchase && hasLifetime && !sub && (
              <>
                <div className="my-6 h-px bg-linear-to-r from-transparent via-border to-transparent" />
                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-secondary-foreground">
                      <Infinity className="size-3.5" />
                      Plan
                    </div>
                    <p className="flex items-center gap-1.5 font-medium text-foreground">
                      Lifetime
                      <Sparkles className="size-3.5 text-primary" />
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-secondary-foreground">
                      <Check className="size-3.5" />
                      Status
                    </div>
                    <p className="font-medium text-green-600 dark:text-green-400">Lifetime access</p>
                  </div>
                </div>
              </>
            )}

            {hasActivePurchase && (
              <>
                <div className="my-6 h-px bg-linear-to-r from-transparent via-border to-transparent" />
                {licenseKey ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Key className="size-4" />
                      License key
                    </div>
                    <code className="block break-all rounded-xl bg-muted/50 px-4 py-3 font-mono text-sm text-foreground">
                      {licenseKey}
                    </code>
                    <p className="text-xs text-muted-foreground">
                      Click Manage license to see your full key.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-secondary-foreground">
                    Your license key will appear here once processed. Check the Polar portal for details.
                  </p>
                )}
              </>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {hasActivePurchase ? (
                <>
                  <DownloadButton size="default" className="rounded-full" />
                  <Button variant="outline" onClick={handlePortal} className="rounded-full">
                    Manage license
                    <ExternalLink className="size-4" />
                  </Button>
                </>
              ) : (
                <Button asChild className="rounded-full">
                  <Link href="/#pricing">Get MotionDesk</Link>
                </Button>
              )}
            </div>
          </LiquidGlassCard>
        </motion.div>
      </div>
    </section>
  );
}
