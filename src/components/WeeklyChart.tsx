import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FootprintEntry } from "@/lib/carbon-data";

interface WeeklyChartProps {
  data: FootprintEntry[];
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const last7 = data.slice(-7);

  if (last7.length === 0) {
    return (
      <Card className="border-border/60 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">Weekly Footprint</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48 text-muted-foreground">
          No data yet. Start logging your daily emissions!
        </CardContent>
      </Card>
    );
  }

  const totalWeek = last7.reduce((s, d) => s + d.footprint, 0).toFixed(1);
  const avgDay = (last7.reduce((s, d) => s + d.footprint, 0) / last7.length).toFixed(1);

  return (
    <Card className="border-border/60 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-foreground">Weekly Footprint</CardTitle>
        <div className="flex gap-4 text-sm text-muted-foreground mt-1">
          <span>Total: <strong className="text-foreground">{totalWeek} kg CO₂</strong></span>
          <span>Daily avg: <strong className="text-foreground">{avgDay} kg CO₂</strong></span>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={last7} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="day" className="text-xs fill-muted-foreground" />
            <YAxis className="text-xs fill-muted-foreground" unit=" kg" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                fontSize: "0.8rem",
              }}
            />
            <Legend iconSize={10} wrapperStyle={{ fontSize: "0.75rem" }} />
            <Bar dataKey="transport" stackId="a" fill="hsl(var(--eco-earth))" name="Transport" radius={[0, 0, 0, 0]} />
            <Bar dataKey="electricity" stackId="a" fill="hsl(var(--eco-sun))" name="Electricity" />
            <Bar dataKey="diet" stackId="a" fill="hsl(var(--eco-warning))" name="Diet" />
            <Bar dataKey="waste" stackId="a" fill="hsl(var(--eco-leaf))" name="Waste" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
