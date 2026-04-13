import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import EmissionForm from "@/components/EmissionForm";
import WeeklyChart from "@/components/WeeklyChart";
import ReductionTips from "@/components/ReductionTips";
import FootprintSummary from "@/components/FootprintSummary";
import {
  DailyEntry,
  FootprintEntry,
  calculateFootprint,
  getReductionTips,
  saveEntries,
  loadEntries,
} from "@/lib/carbon-data";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
  const [entries, setEntries] = useState<FootprintEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  const handleSubmit = (daily: DailyEntry) => {
    const footprint = calculateFootprint(daily);

    // Replace existing entry for same date or append
    const updated = [...entries.filter((e) => e.date !== footprint.date), footprint].sort(
      (a, b) => a.date.localeCompare(b.date)
    );

    setEntries(updated);
    saveEntries(updated);

    toast({
      title: `${footprint.footprint} kg CO₂ logged`,
      description: `Footprint for ${footprint.day} has been recorded.`,
    });
  };

  const tips = getReductionTips(entries);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto flex items-center gap-3 py-4 px-4">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">CarbonTrack</h1>
            <p className="text-xs text-muted-foreground">Monitor & reduce your carbon footprint</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-6">
        <FootprintSummary data={entries} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmissionForm onSubmit={handleSubmit} />
          <WeeklyChart data={entries} />
        </div>

        <ReductionTips tips={tips} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        Built to help you live greener 🌍
      </footer>
    </div>
  );
}
