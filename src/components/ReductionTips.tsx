import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface ReductionTipsProps {
  tips: string[];
}

export default function ReductionTips({ tips }: ReductionTipsProps) {
  return (
    <Card className="border-border/60 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-eco-sun" />
          Tips to Reduce Your Footprint
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {tips.map((tip, i) => (
            <li key={i} className="text-sm text-foreground/85 bg-secondary/50 rounded-lg p-3 leading-relaxed">
              {tip}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
