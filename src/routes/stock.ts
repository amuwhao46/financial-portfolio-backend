import { Hono } from "hono";
import { getStockQuote, searchStocks } from "../services/finnhub";

const stock = new Hono();
stock.get("/search", async (c) => {
  const query = c.req.query("q");

  if (!query) {
    return c.json({ error: 'Query parameter "q" is required' }, 400);
  }

  try {
    const data = await searchStocks(query);
    return c.json(data);
  } catch (error) {
    return c.json({ error: "Failed to fetch stock search data" }, 500);
  }
});

stock.get("/quote/:symbol", async (c) => {
  const symbol = c.req.param("symbol");

  if (!symbol) {
    return c.json({ error: "Symbol parameter is required" }, 400);
  }

  try {
    const data = await getStockQuote(symbol);
    return c.json(data);
  } catch (error) {
    return c.json({ error: "Failed to fetch stock query" }, 500);
  }
});

export default stock;
