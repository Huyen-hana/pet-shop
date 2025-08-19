import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../../../services/cart-service/cart-service';
import { Router, RouterLink } from '@angular/router';
import { EmptyCart } from "../empty-cart/empty-cart";

@Component({
  selector: 'app-mini-cart',
  imports: [DrawerModule, DataViewModule, ButtonModule, CommonModule, RouterLink, EmptyCart],
  templateUrl: './mini-cart.html',
  styleUrl: './mini-cart.scss'
})
export class MiniCart {
  cartService = inject(CartService);
  cartItems = computed(() => this.cartService.items());
  private router = inject(Router);
  
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  onDrawerHide() {
    this.visibleChange.emit(false);
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
