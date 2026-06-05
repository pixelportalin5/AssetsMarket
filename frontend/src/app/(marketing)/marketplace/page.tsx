import type { Metadata } from "next";
import { Filter, SlidersHorizontal } from "lucide-react";

import { AssetCard } from "@/components/shared/asset-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { featuredAssets, marketplaceCategories } from "@/data/mock";

export const metadata: Metadata = {
  title: "Marketplace",
};

export default function MarketplacePage() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="animate-slide-up">
          <Badge variant="accent" className="mb-4">
            Marketplace
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Browse advertising assets
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Explore verified inventory across outdoor, digital, audio, influencer, and transit
            channels. All listings use mock data.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Input placeholder="Search by name, category, or seller..." className="max-w-xl" />
          <div className="flex gap-2">
            <Button variant="secondary" disabled>
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="secondary" disabled>
              <SlidersHorizontal className="h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {marketplaceCategories.map((category, index) => (
            <Badge
              key={category}
              variant={index === 0 ? "default" : "outline"}
              className="cursor-default px-3 py-1"
            >
              {category}
            </Badge>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Showing {featuredAssets.length} assets (mock)
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredAssets.map((asset) => (
            <AssetCard key={asset.id} {...asset} />
          ))}
        </div>
      </div>
    </div>
  );
}
