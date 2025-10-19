import { Component, OnInit } from '@angular/core';
import { Item, ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent  implements OnInit {
  items: Item[] = [];
  newItem: Item = { name: '', description: '', price: 0 };

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe(data => (this.items = data));
  }

  addItem() {
    this.itemService.addItem(this.newItem).subscribe(() => {
      this.newItem = { name: '', description: '', price: 0 };
      this.loadItems();
    });
  }

  deleteItem(id: string) {
    this.itemService.deleteItem(id).subscribe(() => this.loadItems());
  }
}
