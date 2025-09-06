import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../../../shared/models/common.model';
import { CartService } from '../../../../shared/services/cart-service/cart-service';
import { ButtonGroup } from "primeng/buttongroup";
import { DecimalPipe } from '@angular/common';
import { EmptyCart } from '../../../../shared/components/bussiness/cart/empty-cart/empty-cart';
import { myTable } from "../../../../shared/components/ui/table/table";

@Component({
  selector: 'app-cart-page',
  imports: [EmptyCart, ButtonModule, InputTextModule, FluidModule, RouterLink, ButtonGroup, DecimalPipe, myTable],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPage {
  cartService = inject(CartService);
  products!: CartItem[];

  cartItems = computed(() => this.cartService.items());
  cartColumns: { field: string; header: string }[] = [
    { field: 'image', header: 'Image' },
    { field: 'name', header: 'Name' },
    { field: 'price', header: 'Price' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'total', header: 'Total' },
    { field: 'actions', header: 'Acts' }  
  ];
  getColumnWidth(field: string): string {
    switch (field) {
      case 'image': return '10%';
      case 'name': return '30%';
      case 'price': return '16%';
      case 'quantity': return '22%';
      case 'total': return '16%';
      case 'actions': return '6%';
      default: return 'auto';
    }
  };  

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
