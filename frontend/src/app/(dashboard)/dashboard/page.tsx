import type { Metadata } from "next";
import { ArrowUpRight, TrendingUp } from "lucide-react";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { AssetCard } from "@/components/shared/asset-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardActivity, dashboardStats, featuredAssets } from "@/data/mock";

export const metadata: Metadata = {
  title: "Dashboard",
};

const statusVariant = {
  pending: "outline" as const,
  success: "accent" as const,
  info: "secondary" as const,
};

export default function DashboardPage() {
  return (
    <DashboardShell
      title="Dashboard"
      description="Overview of your listings, bookings, and campaign performance — mock data."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-accent" />
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Latest updates across your account</CardDescription>
            </div>
            <Button variant="ghost" size="sm" disabled>
              View all
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <Badge variant={statusVariant[item.status]}>{item.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {["List new asset", "Create campaign", "Review bookings", "Withdraw funds"].map(
              (action) => (
                <Button key={action} variant="secondary" className="w-full justify-between" disabled>
                  {action}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              ),
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Your top-performing assets</h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredAssets.slice(0, 3).map((asset) => (
            <AssetCard key={asset.id} {...asset} />
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
