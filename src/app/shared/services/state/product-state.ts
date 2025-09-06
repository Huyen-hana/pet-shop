import { inject, Injectable, signal } from '@angular/core';
import { ProductService } from '../product-service/product-service';
import { customMessageService } from '../message-service/message-service';
import { Loading } from '../loading/loading';
import { finalize, map, Subject, takeUntil } from 'rxjs';
import { Order, ProductInOrder } from '../../models/order.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductState {
  // products = signal<Order[]>([]);
  reccentSales= signal<ProductInOrder[]>([]);

  private productService = inject(ProductService);
  private mesService = inject(customMessageService);
  private loading = inject(Loading);
  private destroy$ = new Subject<void>();
  private orderParams?: HttpParams;

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  };
  
  loadOrder() {
    this.loading.show();
    this.orderParams = new HttpParams()
      .set('orderby', 'createdAt')
      .set('order', 'desc')
      .set('page', 1)
      .set('limit', 3);
    this.productService.getOrder(this.orderParams).pipe(
      takeUntil(this.destroy$),
      map((orders) => {
        return orders.flatMap(order => order.cart);
      }),
      finalize(() => this.loading.hide())
    ).subscribe({
      next: (cartList: ProductInOrder[]) => {
        this.reccentSales.set(cartList);
      },
      error: () => this.mesService.showError('Error', 'Unable to load cart data')
    });
  };
}
