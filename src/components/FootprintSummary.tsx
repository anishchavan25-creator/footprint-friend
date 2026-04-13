import { Card, CardContent } from "@/components/ui/card";
import { Leaf, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { FootprintEntry } from "@/lib/carbon-data";

interface FootprintSummaryProps {
  data: FootprintEntry[];
}

export default function FootprintSummary({ data }: FootprintSummaryProps) {
  if (data.length === 0) return null;

  const latest = data[data.length - 1];
  const previous = data.length > 1 ? data[data.length - 2] : null;
  const diff = previous ? latest.footprint - previous.footprint : 0;
  const TrendIcon = diff < 0 ? TrendingDown : diff > 0 ? TrendingUp : Minus;
  const trendColor = diff < 0 ? "text-primary" : diff > 0 ? "text-destructive" : "text-muted-foreground";

  return (
    <Card className="border-primary/20 bg-primary/5 shadow-lg">
      <CardContent className="pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Today's Footprint</p>
            <p className="text-2xl font-bold text-foreground">{latest.footprint} <span className="text-base font-normal text-muted-foreground">kg CO₂</span></p>
          </div>
        </div>
        {previous && (
          <div className={`flex items-center gap-1 ${trendColor}`}>
            <TrendIcon className="h-4 w-4" />
            <span className="text-sm font-medium">{Math.abs(diff).toFixed(1)} kg</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
