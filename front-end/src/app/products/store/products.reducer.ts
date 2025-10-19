import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { Product } from '../models/product.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ProductsState extends EntityState<Product> {
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductsState = adapter.getInitialState({
  loading: false,
  error: null,
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
  }))
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
