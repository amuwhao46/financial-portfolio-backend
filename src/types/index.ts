export interface StockQuoteResponse {
  symbol: string;
  currentPrice: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  change: number;
  changePercent: number;
  timestamp: number;
}

export interface StockSearchResponse {
  count: number;
  results: SearchResult[];
}

export interface SearchResult {
  symbol: string;
  name: string;
  type: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
}

export interface PortfolioStock {
  id: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
}
