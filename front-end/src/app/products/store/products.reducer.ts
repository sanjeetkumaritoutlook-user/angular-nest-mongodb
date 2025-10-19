import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { Product } from '../models/product.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ProductsState extends EntityState<Product> {
  loading: boolean;
  error: any | null;
  // ui
  sortBy: string | null;
  sortDir: 'asc'|'desc';
  filter: { q?: string; category?: string; priceMin?: number; priceMax?: number };
  page: number;
  pageSize: number;
  totalCount: number; // optional server-provided total
  liveUpdatesOn: boolean;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductsState = adapter.getInitialState({
  loading: false,
  error: null,
   sortBy: 'title',
  sortDir: 'asc',
  filter: {},
  page: 1,
  pageSize: 10,
  totalCount: 0,
  liveUpdatesOn: false
});

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) =>
    adapter.setAll(products, { ...state, loading: false })
  ),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // UI
  on(ProductsActions.setSort, (state, { sortBy, sortDir }) => ({ ...state, sortBy, sortDir })),
  on(ProductsActions.setFilter, (state, { filter }) => ({ ...state, filter, page: 1 })), // reset page
  on(ProductsActions.setPage, (state, { page }) => ({ ...state, page })),
  on(ProductsActions.setPageSize, (state, { pageSize }) => ({ ...state, pageSize, page: 1 })),

  // Live updates
  on(ProductsActions.startLiveUpdates, (state) => ({ ...state, liveUpdatesOn: true })),
  on(ProductsActions.stopLiveUpdates, (state) => ({ ...state, liveUpdatesOn: false })),
  on(ProductsActions.liveUpdateReceived, (state, { products }) =>
    adapter.upsertMany(products, { ...state, totalCount: Math.max(state.totalCount, products.length) })
  )
);


// selectors helper export
export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();