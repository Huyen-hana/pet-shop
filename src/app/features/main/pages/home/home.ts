import { Component, inject, OnInit } from '@angular/core';
import { SocialBanner } from '../../../../shared/components/bussiness/social-banner/social-banner';
import { Photo } from '../../../../shared/services/business/photo-service';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../../../shared/components/bussiness/products/product-card/product-card';
import { ProductService } from '../../../../shared/services/product-service/product-service';
import { Product } from '../../../../shared/models/product.model';
import { Subscription } from 'rxjs';
import { Loading } from '../../../../shared/services/loading/loading';

@Component({
  selector: 'app-home',
  imports: [SocialBanner, RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  policies = [
    {
      title: 'Miễn Phí Vận Chuyển',
      icon: 'pi pi-map-marker'
    },
    {
      title: 'Sản Phẩm Chính Hãng',
      icon: 'pi pi-verified'
    },
    {
      title: 'Thanh Toán Tiện Lợi',
      icon: 'pi pi-wallet'
    },
    {
      title: 'Hỗ Trợ Chuyên Nghiệp',
      icon: 'pi pi-whatsapp'
    },
  ]

  private photoService = inject(Photo);
  private loading = inject(Loading);
  private timeoutId: any;
  brands = this.photoService.brands;

  private productService = inject(ProductService);
  subscript : Subscription | undefined;
  products: Product[] = [];
  lovedProducts: Product[] = [];
  newProducts: Product[] = [];

  ngOnInit(): void {
    this.getAllProducts();
  };
  ngOnDestroy(): void {
    if (this.subscript) {
      this.subscript.unsubscribe();
    };
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }; 
  };

  getAllProducts() {
    this.loading.show();
    this.subscript = this.productService.getAll().subscribe((products: Product[]) => {
      this.products = products;

      this.lovedProducts = products.slice(0, 10);
      this.newProducts = products.slice(10, 20);
      
      this.timeoutId = setTimeout(() => {
        this.loading.hide();
      }, 0);
    })
  };

}
