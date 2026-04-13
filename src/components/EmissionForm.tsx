import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Car, Zap, UtensilsCrossed, Trash2 } from "lucide-react";
import { DailyEntry } from "@/lib/carbon-data";

interface EmissionFormProps {
  onSubmit: (entry: DailyEntry) => void;
}

const fields = [
  { key: "transport" as const, label: "Distance Driven", unit: "km", icon: Car, placeholder: "e.g. 25" },
  { key: "electricity" as const, label: "Electricity Used", unit: "kWh", icon: Zap, placeholder: "e.g. 12" },
  { key: "meals" as const, label: "Meat-based Meals", unit: "meals", icon: UtensilsCrossed, placeholder: "e.g. 2" },
  { key: "waste" as const, label: "Waste Generated", unit: "kg", icon: Trash2, placeholder: "e.g. 1.5" },
];

export default function EmissionForm({ onSubmit }: EmissionFormProps) {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [values, setValues] = useState({ transport: "", electricity: "", meals: "", waste: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date,
      transport: parseFloat(values.transport) || 0,
      electricity: parseFloat(values.electricity) || 0,
      meals: parseFloat(values.meals) || 0,
      waste: parseFloat(values.waste) || 0,
    });
    setValues({ transport: "", electricity: "", meals: "", waste: "" });
  };

  return (
    <Card className="border-border/60 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">Log Daily Emissions</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date" className="text-muted-foreground text-sm">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              max={today}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(({ key, label, unit, icon: Icon, placeholder }) => (
              <div key={key}>
                <Label htmlFor={key} className="text-muted-foreground text-sm flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label} ({unit})
                </Label>
                <Input
                  id={key}
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder={placeholder}
                  value={values[key]}
                  onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                  className="mt-1"
                />
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
            Calculate & Log Footprint
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
