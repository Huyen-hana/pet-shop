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
  product: Product | undefined;
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
