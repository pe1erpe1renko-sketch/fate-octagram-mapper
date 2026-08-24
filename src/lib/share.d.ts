export function shareForecast(forecast: {
  date: string;
  personName: string;
  arcana: number;
  text: string;
}): Promise<{ ok: boolean; method: "share" | "clipboard" | "none" }>;
