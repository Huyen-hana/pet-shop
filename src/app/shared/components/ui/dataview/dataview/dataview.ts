import { Component, inject, Input, TemplateRef } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { BadgeModule } from 'primeng/badge';
import { CartService } from '../../../../services/cart-service/cart-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dataview',
  imports: [DataViewModule, BadgeModule, CommonModule],
  templateUrl: './dataview.html',
  styleUrl: './dataview.scss'
})
export class Dataview {
  cartService = inject(CartService);
  @Input() headerTemplate!: TemplateRef<any>;
  @Input() nameTemplate!: TemplateRef<any>;
  @Input() buttonTemplate!: TemplateRef<any>;

  get products() {
    return this.cartService.items();
  };
}
