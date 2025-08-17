import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FluidModule } from 'primeng/fluid';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../../../shared/models/common.model';
import { CartService } from '../../../../shared/services/cart-service/cart-service';
import { ButtonGroup } from "primeng/buttongroup";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  imports: [ButtonModule, InputTextModule, TableModule, FluidModule, RouterLink, ButtonGroup, DecimalPipe],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPage {
  cartService = inject(CartService);
  products!: CartItem[];

  cartItems = computed(() => this.cartService.items());

  increaseQuant(id: string): void {
    if (this.cartService.isIncart(id)) {
      this.cartService.increaseQuantity(id);
    }
  }; 
  decreaseQuant(id: string): void {
    const isIncart = this.cartService.isIncart(id);
    if (isIncart) {
      this.cartService.decreaseQuantity(id);
    }  
  };
  
  clearAll() {
    this.cartService.clearCart();
  };
}
