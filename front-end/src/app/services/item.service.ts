import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
export interface Item {
  _id?: string;
  name: string;
  description?: string;
  price?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

 private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getItem(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  updateItem(id: string, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
