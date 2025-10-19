import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ProductsFacade } from '../store/products.facade';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product.model';
@Component({
  selector: 'app-products',
  templateUrl : './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$ = this.facade.products$;
  loading$ = this.facade.loading$;
  error$ = this.facade.error$;
  page$ = this.facade.page$;
  pageSize$ = this.facade.pageSize$;
  totalFiltered$ = this.facade.totalFiltered$;
  totalPages$ = this.facade.totalPages$;
  liveOn$ = this.facade.liveUpdatesOn$;

  // local form model
  q = '';
  category = '';
  priceMin?: number;
  priceMax?: number;
  sortBy = 'title';
  sortDir: 'asc'|'desc' = 'asc';
  pageSizeOptions = [5, 10, 20, 50];

  private subs = new Subscription();
  constructor(public facade: ProductsFacade) {}

  ngOnInit(): void {
    this.facade.loadProducts();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.facade.stopLive();
  }

  applyFilter() {
    this.facade.setFilter({ q: this.q, category: this.category, priceMin: this.priceMin, priceMax: this.priceMax });
  }

  clearFilter() {
    this.q = ''; this.category = ''; this.priceMin = undefined; this.priceMax = undefined;
    this.facade.setFilter({});
  }

  changeSort(by: string) {
    this.sortBy = by;
    this.facade.setSort(by, this.sortDir);
  }

  toggleSortDir() {
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    this.facade.setSort(this.sortBy, this.sortDir);
  }

  setPage(page: number) { this.facade.setPage(page); }
  setPageSize(size: number) { this.facade.setPageSize(size); }

  toggleLiveUpdates(on: boolean) {
    if (on) {
      this.facade.startLive(15000); // 15s by default
    } else {
      this.facade.stopLive();
    }
  }

  onLiveUpdatesChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.toggleLiveUpdates(target.checked);
  }
}
