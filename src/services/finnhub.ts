const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const API_KEY = process.env.FINNHUB_API_KEY;

export async function searchStocks(query: string) {
  const response = await fetch(
    `${FINNHUB_BASE_URL}/search?q=${query}&exchange=US&token=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stock search data");
  }
  return await response.json();
}

export async function getStockQuote(symbol: string) {
  const response = await fetch(
    `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stock quote data");
  }
  return await response.json();
}
