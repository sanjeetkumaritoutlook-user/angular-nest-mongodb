import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState, selectAll } from './products.reducer';
import { Product } from '../models/product.model';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

// Raw lists
export const selectAllProducts = createSelector(
  selectProductsState,
  selectAll
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state) => state.error
);

// UI slices
export const selectSortBy = createSelector(selectProductsState, (s) => s.sortBy);
export const selectSortDir = createSelector(selectProductsState, (s) => s.sortDir);
export const selectFilter = createSelector(selectProductsState, (s) => s.filter);
export const selectPage = createSelector(selectProductsState, (s) => s.page);
export const selectPageSize = createSelector(selectProductsState, (s) => s.pageSize);
export const selectTotalCount = createSelector(selectProductsState, (s) => s.totalCount);
export const selectLiveUpdatesOn = createSelector(selectProductsState, (s) => s.liveUpdatesOn);

// filtered -> sorted -> paginated pipeline
export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectFilter,
  (products: Product[], filter) => {
    if (!filter || Object.keys(filter).length === 0) return products;
    return products.filter(p => {
      const matchesQuery = !filter.q || p.title.toLowerCase().includes(filter.q.toLowerCase()) || (p.description ?? '').toLowerCase().includes(filter.q.toLowerCase());
      const matchesCategory = !filter.category || p.category === filter.category;
      const matchesPrice = (filter.priceMin == null || p.price >= filter.priceMin) && (filter.priceMax == null || p.price <= filter.priceMax);
      return matchesQuery && matchesCategory && matchesPrice;
    });
  }
);

export const selectSortedProducts = createSelector(
  selectFilteredProducts,
  selectSortBy,
  selectSortDir,
  (products, sortBy, sortDir) => {
    if (!sortBy) return products;
    const copy = [...products];
    copy.sort((a: any, b: any) => {
      const av = a[sortBy] ?? '';
      const bv = b[sortBy] ?? '';
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return copy;
  }
);

export const selectPagedProducts = createSelector(
  selectSortedProducts,
  selectPage,
  selectPageSize,
  (products, page, pageSize) => {
    const start = (page - 1) * pageSize;
    return products.slice(start, start + pageSize);
  }
);

// Pagination metadata
export const selectTotalFiltered = createSelector(selectFilteredProducts, (p) => p.length);
export const selectTotalPages = createSelector(selectTotalFiltered, selectPageSize, (total, pageSize) => Math.ceil(total / pageSize));