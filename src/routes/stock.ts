import { Hono } from "hono";
import { getStockQuote, searchStocks } from "../services/finnhub";
import type {
  ErrorResponse,
  StockQuoteResponse,
  StockSearchResponse,
} from "../types";

const stock = new Hono();

stock.get("/search", async (c) => {
  const query = c.req.query("q");

  if (!query) {
    return c.json<ErrorResponse>(
      { error: 'Query parameter "q" is required' },
      400
    );
  }

  try {
    const finnhubData = await searchStocks(query);

    const response: StockSearchResponse = {
      count: finnhubData.count,
      results: finnhubData.result.map((item) => ({
        symbol: item.symbol,
        name: item.description,
        type: item.type,
      })),
    };

    return c.json(response);
  } catch (error) {
    return c.json<ErrorResponse>(
      { error: "Failed to fetch stock search data" },
      500
    );
  }
});

stock.get("/quote/:symbol", async (c) => {
  const symbol = c.req.param("symbol");

  if (!symbol) {
    return c.json<ErrorResponse>(
      { error: "Symbol parameter is required" },
      400
    );
  }

  try {
    const quote = await getStockQuote(symbol);

    const response: StockQuoteResponse = {
      symbol: symbol.toUpperCase(),
      currentPrice: quote.c,
      change: quote.d || quote.c - quote.pc,
      changePercent: quote.dp || ((quote.c - quote.pc) / quote.pc) * 100,
      high: quote.h,
      low: quote.l,
      open: quote.o,
      previousClose: quote.pc,
      timestamp: quote.t,
    };

    return c.json(response);
  } catch (error) {
    return c.json<ErrorResponse>({ error: "Failed to fetch stock query" }, 500);
  }
});

export default stock;
