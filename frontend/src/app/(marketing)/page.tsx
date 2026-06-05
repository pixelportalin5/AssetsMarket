import { ArrowRight, BarChart3, Shield, Zap } from "lucide-react";
import Link from "next/link";

import { AssetCard } from "@/components/shared/asset-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { featuredAssets, platformStats } from "@/data/mock";

export default function LandingPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="bg-mesh-gradient absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="mb-6">
              Digital Asset Marketplace
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Trade premium{" "}
              <span className="text-gradient">advertising inventory</span> with confidence
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Connect with verified sellers, launch campaigns faster, and close deals with
              escrow-protected transactions — all in one futuristic marketplace.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/marketplace">
                  Explore Marketplace
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">List Your Assets</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platformStats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-gradient">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium">{stat.label}</p>
                  <p className="mt-1 text-xs text-accent">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
            <p className="mt-3 text-muted-foreground">
              Three steps from discovery to closed deal
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Discover Assets",
                description:
                  "Browse verified billboards, podcast slots, influencer bundles, and programmatic inventory.",
              },
              {
                icon: BarChart3,
                title: "Launch Campaigns",
                description:
                  "Book inventory, manage bookings, and track impressions from a unified dashboard.",
              },
              {
                icon: Shield,
                title: "Close with Escrow",
                description:
                  "Funds held securely until delivery is confirmed. Dispute resolution built in.",
              },
            ].map((step) => (
              <Card key={step.title}>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="sellers" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured assets</h2>
              <p className="mt-2 text-muted-foreground">Curated inventory from top sellers</p>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/marketplace">View all</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredAssets.slice(0, 3).map((asset) => (
              <AssetCard key={asset.id} {...asset} />
            ))}
          </div>
        </div>
      </section>

      <section id="advertisers" className="px-4 py-20 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-7xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <CardHeader className="flex flex-col justify-center p-8 lg:p-12">
              <Badge variant="default" className="mb-4 w-fit">
                For Advertisers
              </Badge>
              <CardTitle className="text-3xl">Scale campaigns without the friction</CardTitle>
              <CardDescription className="mt-4 text-base">
                Access premium inventory, compare pricing transparently, and manage every booking from
                a single glass-dashboard experience.
              </CardDescription>
              <Button className="mt-8 w-fit" asChild>
                <Link href="/dashboard">Open Dashboard Preview</Link>
              </Button>
            </CardHeader>
            <div className="relative hidden min-h-[280px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent lg:block">
              <div className="absolute inset-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl" />
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
