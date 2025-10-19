import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, timer, EMPTY  } from 'rxjs';
import { catchError, map, mergeMap, switchMap, exhaustMap, concatMap } from 'rxjs/operators';
import * as ProductsActions from './products.actions';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductsEffects {
 constructor(private actions$: Actions, private productsService: ProductsService) {}
  // 1) loadProducts - fetch base products and dispatch success
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      // mergeMap allows concurrent loads if triggered multiple times
      mergeMap(() =>
        this.productsService.getProducts().pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error) => of(ProductsActions.loadProductsFailure({ error })))
        )
      )
    )
  );

   // 2) Enrich selected products using forkJoin (example: fetch details+inventory for visible page)
  // Action pattern: you can dispatch a custom action to load details for a list of IDs; here we demonstrate usage via live updates
  loadDetailsForIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductsSuccess),
      // when product list loads, fetch additional details for visible product ids
      mergeMap(({ products }) => {
        const ids = products.slice(0, 5).map(p => p.id); // example: enrich first 5
        if (!ids.length) return EMPTY;
        return this.productsService.getMultipleProductsDetails(ids).pipe(
          map(detailsArray => {
            // merge details into product shapes (example payload)
            const enrichedProducts = detailsArray.map((d: any) => ({
              id: d.id,
              inventory: d.inventory.inventory,
              lastUpdated: d.inventory.lastUpdated
            }));
            // Upsert to store using the liveUpdateReceived action
            return ProductsActions.liveUpdateReceived({ products: enrichedProducts as any });
          }),
          catchError(() => of(ProductsActions.loadProductsFailure({ error: 'detail fetch error' })))
        );
      })
    )
  );

  // 3) Start live updates: poll every intervalMs and mergeMap to fetch latest products, then forkJoin to enrich some items
  startLiveUpdates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.startLiveUpdates),
      switchMap(({ intervalMs = 10000 }) => // switchMap cancels previous live streams if restarted
        timer(0, intervalMs).pipe(
          // For each tick, fetch products (mergeMap allows concurrency)
          mergeMap(() =>
            this.productsService.getProducts().pipe(
              // Optionally enrich a subset of items with forkJoin via service.getMultipleProductsDetails
              mergeMap((products) => {
                const ids = products.slice(0, 5).map(p => p.id);
                return this.productsService.getMultipleProductsDetails(ids).pipe(
                  map(detailResults => {
                    // combine base product list with enrichment map
                    // build small enriched payload; in real app you'd merge fields
                    const enriched = detailResults.map((d: any) => ({
                      id: d.id,
                      inventory: d.inventory.inventory,
                      lastUpdated: d.inventory.lastUpdated
                    }));
                    // dispatch as live update
                    return ProductsActions.liveUpdateReceived({ products: enriched as any[] });
                  }),
                  catchError(err => of(ProductsActions.loadProductsFailure({ error: err })))
                );
              }),
              catchError(err => of(ProductsActions.loadProductsFailure({ error: err })))
            )
          )
        )
      )
    )
  );

  // 4) stopLiveUpdates -> handled by switching in startLiveUpdates (you can dispatch stop and have a separate effect if needed)
}
