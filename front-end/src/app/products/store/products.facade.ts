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
  page$ = this.store.select(ProductsSelectors.selectPage);
  pageSize$ = this.store.select(ProductsSelectors.selectPageSize);
  totalFiltered$ = this.store.select(ProductsSelectors.selectTotalFiltered);
  totalPages$ = this.store.select(ProductsSelectors.selectTotalPages);
  liveUpdatesOn$ = this.store.select(ProductsSelectors.selectLiveUpdatesOn);

  constructor(private store: Store) {}

  loadProducts() {
    this.store.dispatch(ProductsActions.loadProducts());
  }
  setSort(sortBy: string, sortDir: 'asc' | 'desc') { this.store.dispatch(ProductsActions.setSort({ sortBy, sortDir })); }
  setFilter(filter: any) { this.store.dispatch(ProductsActions.setFilter({ filter })); }
  setPage(page: number) { this.store.dispatch(ProductsActions.setPage({ page })); }
  setPageSize(pageSize: number) { this.store.dispatch(ProductsActions.setPageSize({ pageSize })); }

  startLive(intervalMs?: number) { this.store.dispatch(ProductsActions.startLiveUpdates({ intervalMs })); }
  stopLive() { this.store.dispatch(ProductsActions.stopLiveUpdates()); }
}
