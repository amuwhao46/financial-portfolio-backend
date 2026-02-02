import z from "zod";

export const finnhubQuoteSchema = z.object({
  c: z.number().min(0),
  d: z.number().optional(),
  dp: z.number().optional(),
  h: z.number().min(0),
  l: z.number().min(0),
  o: z.number(),
  pc: z.number(),
  t: z.number(),
});

export const finnhubSearchResultSchema = z.object({
  description: z.string(),
  displaySymbol: z.string(),
  symbol: z.string(),
  type: z.string(),
});

export const finnhubSearchSchema = z.object({
  count: z.number(),
  result: z.array(finnhubSearchResultSchema),
});

export type FinnhubQuote = z.infer<typeof finnhubQuoteSchema>;
export type FinnhubSearchResult = z.infer<typeof finnhubSearchResultSchema>;
export type FinnhubSearch = z.infer<typeof finnhubSearchSchema>;
