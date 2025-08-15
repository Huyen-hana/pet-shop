import { inject, Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly url: string = 'https://684edc89f0c9c9848d2957f0.mockapi.io/products/product';
  private http = inject(HttpClient);
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  };
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + `/${id}`);
  };

}
