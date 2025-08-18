import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../shared/services/product-service/product-service';
import { Product } from '../../../../shared/models/product.model';
import { customMessageService } from '../../../../shared/services/message-service/message-service';
import { Galleria, GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { FluidModule } from 'primeng/fluid';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { CartService } from '../../../../shared/services/cart-service/cart-service';


@Component({
  selector: 'app-product-detail',
  imports: [GalleriaModule, ImageModule, ButtonModule, ButtonGroupModule, FluidModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetail implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private destroy$ = new Subject<void>;
  private productService = inject(ProductService);
  private messageService = inject(customMessageService);
  cartItemService = inject(CartService);
  product!: Product;
  selectedQuantities: { [productId: string]: number } = {};
  private images: any[] = [
    {
      itemImageSrc: 'assets/images/products/demo-img/demo.webp',
      title: '1',
      thumbnailImageSrc: 'assets/images/products/demo-img/demo-thumb.jpg'
    },       
    {
      itemImageSrc: 'assets/images/products/demo-img/demo.webp',
      title: '1',
      thumbnailImageSrc: 'assets/images/products/demo-img/demo-thumb.jpg'
    },
    {
      itemImageSrc: 'assets/images/products/demo-img/cat-demo.webp',
      title: '1',
      thumbnailImageSrc: 'assets/images/products/demo-img/cat-demo-thumb.jpg'
    },
    {
      itemImageSrc: 'assets/images/products/demo-img/cat-demo.webp',
      title: '1',
      thumbnailImageSrc: 'assets/images/products/demo-img/cat-demo-thumb.jpg'
    }
  ];
  get demoImages() {
    return this.images;
  };
  
  ngOnInit(): void {
    this.renderProduct();
  };
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.selectedQuantities = {};
  };
  renderProduct() {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$),
      switchMap(param => 
        this.productService.getProductById(+param['id'])
      )
    ).subscribe({
      next: (data) => {
        this.product = data;
        this.images.unshift(
          {
            itemImageSrc: `assets/images/products/img/id${data.id}.webp`,
            thumbnailImageSrc: `assets/images/products/img/id${data.id}-thumb.jpg`,
            title: `${data.name}`
          },          {
            itemImageSrc: `assets/images/products/img/id${data.id}.webp`,
            thumbnailImageSrc: `assets/images/products/img/id${data.id}-thumb.jpg`,
            title: `${data.name}`
          },          
          {
            itemImageSrc: `assets/images/products/img/id${data.id}.webp`,
            thumbnailImageSrc: `assets/images/products/img/id${data.id}-thumb.jpg`,
            title: `${data.name}`
          }
      )
      },
      error: (err) => {
        this.messageService.showError('', err.message);
      }
    });
  };

  addProduct(product: Product) {
    this.cartItemService.addItem(product);
  };

  increaseItemQuant(productId: string) {
    const curent = this.selectedQuantities[productId] || 1;
    this.selectedQuantities[productId] = curent + 1;
  };
  decreaseItemQuant(productId: string) {
    const current = this.selectedQuantities[productId] || 0;
    if (current > 1) {
      this.selectedQuantities[productId] = current - 1;
    };
  };
  addToCart(product: Product) {
    const id = product.id as string;
    const quantity = this.selectedQuantities[id] || 1;
    if (this.cartItemService.isIncart(id)) {
      const curentQuant = this.cartItemService.getItemQuantity(id);
      const totalQuant = curentQuant + quantity;

      if (totalQuant > product.currentStock) {
        this.messageService.showWarn(
          'Cannot add to cart',
          `Only ${product.currentStock - curentQuant} items left in stock.`
        );
        return;
      };
      this.cartItemService.updateQuantity(id, totalQuant);
      this.messageService.showSuccess('Success', 'Product has been added to cart');
    } else {
      if (quantity > product.currentStock) {
        this.messageService.showWarn(
          'Cannot add to cart', `Only ${product.currentStock} items left in stock.`
        );
        return;
      }
      const added = this.cartItemService.addItem(product, quantity);
      if (added) {
        this.messageService.showSuccess('Success', 'Product has been added to cart');
      };
    };
    delete this.selectedQuantities[id];
  };

  getQuantity(productId: string): number {
    return this.selectedQuantities[productId] || 1;
  };

  responsiveOptions: any[] = [
    {
        breakpoint: '1536px',
        numVisible: 4
    },
    {
      breakpoint: '1280px',
      numVisible: 3
    },
    {
      breakpoint: '640px',
      numVisible: 2
    }
  ];
  position: 'left' | 'right' | 'top' | 'bottom' = 'bottom';
}
