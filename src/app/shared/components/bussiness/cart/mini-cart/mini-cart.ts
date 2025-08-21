import { Component, computed, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../../../services/cart-service/cart-service';
import { Router, RouterLink } from '@angular/router';
import { EmptyCart } from "../empty-cart/empty-cart";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-mini-cart',
  imports: [DrawerModule, DataViewModule, ButtonModule, CommonModule, RouterLink, EmptyCart],
  templateUrl: './mini-cart.html',
  styleUrl: './mini-cart.scss'
})
export class MiniCart implements OnInit, OnDestroy {
  cartService = inject(CartService);
  cartItems = computed(() => this.cartService.items());
  private router = inject(Router);
  
  visibleMiniCart: boolean = false;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.cartService.visibleMiniCart$
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      this.visibleMiniCart = value;
    });
  };
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };

  onDrawerHide() {
    this.cartService.setCartVisibility(false);
  };
  goProductDetail(id: String) {
    this.router.navigate(['/main/products', id]);
    this.onDrawerHide();
  };
  goCartPage() {
    this.router.navigate(['/main/cart']);
    this.onDrawerHide();
  };

}
