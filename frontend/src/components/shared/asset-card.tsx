import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface AssetCardProps {
  title: string;
  category: string;
  seller: string;
  price: string;
  impressions: string;
  rating: number;
  image: string;
}

export function AssetCard({
  title,
  category,
  seller,
  price,
  impressions,
  rating,
  image,
}: AssetCardProps) {
  return (
    <Card className="group overflow-hidden">
      <div className={`h-36 bg-gradient-to-br ${image} relative`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDQwaDQwVjB6Ii8+PGcgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiPjxwYXRoIGQ9Ik0yMCAyMGg0MHY0MEgyMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <Badge variant="secondary" className="absolute left-3 top-3">
          {category}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <h3 className="line-clamp-1 text-lg font-semibold group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{seller}</p>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-primary">{price}</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{rating}</span>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{impressions} est. impressions</p>
      </CardContent>

      <CardFooter>
        <Button variant="secondary" className="w-full" disabled>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
