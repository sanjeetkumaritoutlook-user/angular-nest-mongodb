import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

// Loading products
export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>()
);

// UI controls
export const setSort = createAction('[Products] Set Sort', props<{ sortBy: string; sortDir: 'asc' | 'desc' }>());
export const setFilter = createAction('[Products] Set Filter', props<{ filter: { q?: string; category?: string; priceMin?: number; priceMax?: number } }>());
export const setPage = createAction('[Products] Set Page', props<{ page: number }>());
export const setPageSize = createAction('[Products] Set Page Size', props<{ pageSize: number }>());

// Live updates
export const startLiveUpdates = createAction('[Products] Start Live Updates', props<{ intervalMs?: number }>());
export const stopLiveUpdates  = createAction('[Products] Stop Live Updates');
export const liveUpdateReceived = createAction('[Products] Live Update Received', props<{ products: Product[] }>());