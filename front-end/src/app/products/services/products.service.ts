import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ProductDetail } from '../models/product-detail.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private API_URL = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  // fetch all products (or server-side paginated if your API supports)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

   // single product detail (example)
  getProductDetail(id: number): Observable<ProductDetail> {
    // Example placeholder: if you have a detail endpoint use it
    const url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url).pipe(
      map(res => ({
        id: res.id,
        description: res.description ?? '',
        specifications: {}
      }))
    );
  }

  // example inventory endpoint (pretend)
  getInventory(id: number): Observable<{ id: number; inventory: number; lastUpdated: string }> {
    // Replace with real endpoint. Here we return random simulated data to show usage.
    return of({ id, inventory: Math.floor(Math.random() * 100), lastUpdated: new Date().toISOString() });
  }

  // Combined detail + inventory using forkJoin
  getProductDetailWithInventory(id: number) {
    return forkJoin({
      detail: this.getProductDetail(id),
      inventory: this.getInventory(id)
    }).pipe(
      map(({ detail, inventory }) => ({
        id,
        detail,
        inventory
      })),
      catchError(err => { throw err; })
    );
  }

  // Bulk fetch details for many products using forkJoin
  getMultipleProductsDetails(ids: number[]) {
    if (!ids.length) return of([]);
    const calls = ids.map(id => this.getProductDetailWithInventory(id));
    return forkJoin(calls);
  }
}
