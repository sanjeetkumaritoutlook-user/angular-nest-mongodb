export interface ProductDetail {
  id: number;
  description: string;
  specifications?: Record<string,string>;
}