export interface DailyEntry {
  date: string; // YYYY-MM-DD
  transport: number; // km driven
  electricity: number; // kWh used
  meals: number; // number of meat-based meals
  waste: number; // kg of waste
}

export interface FootprintEntry {
  date: string;
  day: string;
  footprint: number; // kg CO2
  transport: number;
  electricity: number;
  diet: number;
  waste: number;
}

// Emission factors (kg CO2 per unit)
const FACTORS = {
  transport: 0.21, // per km (avg car)
  electricity: 0.42, // per kWh (global avg)
  meals: 3.3, // per meat meal
  waste: 0.5, // per kg waste
};

export function calculateFootprint(entry: DailyEntry): FootprintEntry {
  const transport = entry.transport * FACTORS.transport;
  const electricity = entry.electricity * FACTORS.electricity;
  const diet = entry.meals * FACTORS.meals;
  const waste = entry.waste * FACTORS.waste;

  const d = new Date(entry.date);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return {
    date: entry.date,
    day: days[d.getDay()],
    footprint: parseFloat((transport + electricity + diet + waste).toFixed(2)),
    transport: parseFloat(transport.toFixed(2)),
    electricity: parseFloat(electricity.toFixed(2)),
    diet: parseFloat(diet.toFixed(2)),
    waste: parseFloat(waste.toFixed(2)),
  };
}

export function getReductionTips(data: FootprintEntry[]): string[] {
  if (data.length === 0) return getGeneralTips();

  const avg = {
    transport: data.reduce((s, d) => s + d.transport, 0) / data.length,
    electricity: data.reduce((s, d) => s + d.electricity, 0) / data.length,
    diet: data.reduce((s, d) => s + d.diet, 0) / data.length,
    waste: data.reduce((s, d) => s + d.waste, 0) / data.length,
  };

  const tips: string[] = [];

  if (avg.transport > 3) {
    tips.push("🚲 Consider cycling or public transport for short trips to cut transport emissions by up to 60%.");
    tips.push("🚗 Carpooling just 2 days a week can halve your commute emissions.");
  }
  if (avg.electricity > 4) {
    tips.push("💡 Switch to LED bulbs and unplug devices when not in use — saves up to 30% electricity.");
    tips.push("🌡️ Adjusting your thermostat by 2°C can reduce energy use by 10%.");
  }
  if (avg.diet > 5) {
    tips.push("🥗 Replacing 2 meat meals per week with plant-based ones reduces diet emissions by ~25%.");
    tips.push("🌱 Try 'Meatless Mondays' — a simple start that makes a big difference.");
  }
  if (avg.waste > 1) {
    tips.push("♻️ Composting food waste can reduce your waste emissions by up to 50%.");
    tips.push("🛍️ Carry reusable bags and bottles to minimize single-use waste.");
  }

  if (tips.length < 3) {
    tips.push(...getGeneralTips().slice(0, 3 - tips.length));
  }

  return tips;
}

function getGeneralTips(): string[] {
  return [
    "🌍 Track your emissions daily to identify your biggest impact areas.",
    "🚶 Walk or bike for trips under 3 km — it's healthier and greener!",
    "🔌 Use a smart power strip to eliminate standby power consumption.",
    "🥦 Eat more locally-sourced, seasonal foods to reduce food miles.",
  ];
}

const STORAGE_KEY = "carbon-tracker-entries";

export function saveEntries(entries: FootprintEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function loadEntries(): FootprintEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
