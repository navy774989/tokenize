interface Market {
  title: string;
  list: MarketListProps[];
}

export interface MarketListProps {
  id: number;
  marketId: string;
  marketName: string;
  baseCurrency: string;
  marketCurrency: string;
  marketCurrencyLong: string;
  ceiling?: string;
  floor?: string;
  baseIncrement?: string;
  quoteIncrement?: string;
  baseMinSize?: string;
  baseMaxSize?: string;
  tradingStatus: string;
  listRoles: any;
  baseCurrencyTruncate: number;
  priceTruncate: number;
  quoteCurrencyTruncate: number;
}

export type MarketsResponse = Market[];
