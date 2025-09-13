import { Component, computed, HostListener, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Megamenu } from '../../../../shared/components/layout/megamenu/megamenu';
import { Search } from '../../../../shared/components/ui/search/search';
import { menuDrawer } from '../../../../shared/components/ui/drawer/drawer';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Category } from '../../../../shared/models/common.model';
import { UserDrawer } from '../../../../shared/components/ui/user-drawer/user-drawer';
import { MiniCart } from '../../../../shared/components/bussiness/cart/mini-cart/mini-cart';
import { CartService } from '../../../../shared/services/cart-service/cart-service';
import { ProductService } from '../../../../shared/services/product-service/product-service';
import { customMessageService } from '../../../../shared/services/message-service/message-service';
import { Product } from '../../../../shared/models/product.model';
import { Subject, takeUntil } from 'rxjs';
import { SearchService } from '../../../../shared/services/search-service/search-service';


@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, Megamenu, Search, menuDrawer, UserDrawer, MiniCart, ButtonModule, BadgeModule, OverlayBadgeModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private router = inject(Router);
  cartService = inject(CartService);
  private productService = inject(ProductService);
  private messService = inject(customMessageService);
  private destroy$ = new Subject<void>();
  searchService = inject(SearchService);
  allProducts: Product[] = [];

  category: Category[] = [
    {
      cateId: 'Chó',
      cateNameList: [
        { cateName: 'Đi đến Chó',
          routerLink: ['/main/collections/dog'],
         },
        {
          cateName: ['Thức ăn cho Chó'],
          cateChild: [
            'Đi đến Thức ăn cho Chó',
            'Thức ăn hạt',
            'Thức ăn ướt',
            'Hỗ trợ điều trị bệnh',
            'Thức ăn hữu cơ'
          ]
        }
      ]
    },
    {
      cateId: 'Mèo',
      cateNameList: [
        { cateName: 'Đi dến Mèo',
          routerLink: ['/main/collections/cat']
         },
        {
          cateName: 'Thức ăn cho Mèo',
          cateChild: [
            'Đi đến thức ăn cho Mèo',
            'Thức ăn hạt',
            'Thức ăn ướt',
            'Hỗ trợ điều trị bệnh',
            'Thức ăn cho mèo con'
          ]
        }
      ]
    },
    { cateId: 'Thiết bị thông minh' },
    { cateId: 'Hàng mới về' },
    { cateId: 'Thương hiệu' },
    { cateId: 'News' },
    { cateId: 'Today\'s Sale' }
  ];
  isNavHidden = false;
  isLogedIn: boolean = false;
  totalItems = computed(() => this.cartService.totalItems());

  ngOnInit(): void {
    this.loadAllProducts();
  };
  private loadAllProducts(): void {
    this.productService.getAll()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (products) => this.allProducts = products,
      error: () => this.messService.showError('Error', 'Failed to load products')
    });
  };

  // scroll navBar
  @HostListener('window:scroll', [])
  onScroll(): void {
    const y = window.scrollY;
    this.isNavHidden = y > 138;  
  };
  get isCartPage(): boolean {
    return this.router.url === '/main/cart';
  };
  toggleMiniCart() {
    if (!this.isCartPage) {
      this.cartService.toggleMiniCart();
    }; 
  };
  toggleSearch(): void {
    this.searchService.toggle();
  };
}
