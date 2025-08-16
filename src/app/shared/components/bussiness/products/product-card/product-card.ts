import { Component, inject, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Button } from "primeng/button";
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../models/product.model';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../services/cart-service/cart-service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CardModule, Button, TagModule, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @Input() product?: Product;
  salePrice: number = 0;
  private cartService = inject(CartService);
  ngOnInit() {
    this.showSalePrice();
  };

  showSalePrice() {
    if (this.product && this.product.sale) {
      this.salePrice = this.product.price - (this.product.price * this.product.sale / 100);
    }
  };

  addProduct(product: Product) {
    this.cartService.addItem(product, 1);
    // localStorage.clear();
  }

  myAmberCard = {
    root: {
      borderRadius: '4px',
      shadow: '0 0 0'
    },
    body: {
      padding: '10px 10px 15px',
      gap: '2px'
    }
  };
  myAmberTag = {
    root: {
      borderRadius: '2px',
      padding: '2px 12px'
    }
  };
}
