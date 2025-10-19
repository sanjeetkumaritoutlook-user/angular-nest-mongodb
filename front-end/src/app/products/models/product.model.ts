export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
   // optional enrichment fields
  inventory?: number;
  lastUpdated?: string;
}
