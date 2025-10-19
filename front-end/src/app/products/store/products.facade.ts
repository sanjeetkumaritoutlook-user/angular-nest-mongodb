import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import * as ProductsSelectors from './products.selectors';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsFacade {
  products$: Observable<Product[]> = this.store.select(ProductsSelectors.selectAllProducts);
  loading$: Observable<boolean> = this.store.select(ProductsSelectors.selectProductsLoading);
  error$: Observable<any> = this.store.select(ProductsSelectors.selectProductsError);

  constructor(private store: Store) {}

  loadProducts() {
    this.store.dispatch(ProductsActions.loadProducts());
  }
}
