import { inject, Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly url: string = 'https://684edc89f0c9c9848d2957f0.mockapi.io/products/product';
  private readonly orderUrl: string = 'https://687fdb48f1dcae717b6070d0.mockapi.io/order';
  private http = inject(HttpClient);
  
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  };
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + `/${id}`);
  };

  getOrder(params?: HttpParams): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl, {params: params});
  };

  updateProduct(id: number, data: any): Observable<Product> {
    return this.http.put<Product>(this.url + `/${id}`, data);
  };

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  };

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.url + `/${id}`)
  };

}
