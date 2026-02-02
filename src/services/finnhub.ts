import { finnhubQuoteSchema, finnhubSearchSchema } from "../schemas/stock";
import type { FinnhubQuote, FinnhubSearch } from "../schemas/stock";

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const API_KEY = process.env.FINNHUB_API_KEY;

export async function searchStocks(query: string): Promise<FinnhubSearch> {
  const response = await fetch(
    `${FINNHUB_BASE_URL}/search?q=${query}&exchange=US&token=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stock search data");
  }

  const data = await response.json();
  const validated = finnhubSearchSchema.parse(data);

  return validated;
}

export async function getStockQuote(symbol: string): Promise<FinnhubQuote> {
  const response = await fetch(
    `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stock quote data");
  }

  const data = await response.json();
  const validated = finnhubQuoteSchema.parse(data);

  return validated;
}
