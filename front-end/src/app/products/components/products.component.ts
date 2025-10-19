import { Component, OnInit } from '@angular/core';
import { ProductsFacade } from '../store/products.facade';

@Component({
  selector: 'app-products',
  templateUrl : './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(public facade: ProductsFacade) {}

  ngOnInit(): void {
    this.facade.loadProducts();
  }
}
