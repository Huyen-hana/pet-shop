import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { Paginator } from '../../../../shared/components/layout/paginator/paginator/paginator';
import { PaginatorState } from 'primeng/paginator';
import { ProductService } from '../../../../shared/services/product-service/product-service';
import { Subject, takeUntil } from 'rxjs';
import { ProductCard } from '../../../../shared/components/bussiness/products/product-card/product-card';
import { Category } from '../../../../shared/models/common.model';
import { FilterPanel } from '../../../../shared/components/layout/filter-panel/filter-panel';
import { DrawerModule } from 'primeng/drawer';
import { ActivatedRoute } from '@angular/router';
import { customMessageService } from '../../../../shared/services/message-service/message-service';
import { Loading } from '../../../../shared/services/loading/loading';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, Paginator, FilterPanel, DrawerModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  productService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);
  messageService = inject(customMessageService);
  private destroys$ = new Subject<void>();
  private timeoutId: any;
  private loadingService = inject(Loading);
  isShow: boolean = false;
  showSort: boolean = false;
  products: Product[] = [];
  pagedProducts: Product[] = [];
  filterProducts: Product[] = [];
  currantCate: string = '';

  itemsPerPage: number = 10;  //match rowPerOptions!
  totalRecords: number = 0;
  rowPerOptions: number [] = [10, 15];
  first: number = 0;

  menuFilter: Category[] = [
    {
      cateId: 'Theo thương hiệu',
      cateNameList: [
        { cateName: 'Royal Canin' },
        { cateName: 'Equillibrio' },
      ]
    },
    {
      cateId: 'Còn hàng',
      cateNameList: [
        { cateName: 'Còn hàng' },
        { cateName: 'Hết hàng' },
      ]
    }
  ];
  sortFilter: Category[] = [
    { cateId: 'Sort by',
      cateNameList: [
        { cateName: 'Low to high' },
        { cateName: 'High to low' },
        { cateName: 'New to old' },
        { cateName: 'Old to new' },
      ]
     },
  ];

  ngOnInit(): void {
    this.allProducts();
  };
  ngOnDestroy(): void {
    this.destroys$.next();
    this.destroys$.complete();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    };  
  };

  allProducts() {
    this.loadingService.show();
    this.activatedRoute.params.pipe(
      takeUntil(this.destroys$)
    ).subscribe(params => {
      const type = params['name'];
      this.currantCate = type;
      this.typeChange(type);
    })
  };

  private typeChange(type: string) {
    if (type === 'all') {
      this.loadProducts();
    } else {
      // path /:name
      this.loadProductsByType(type);
    }
  };
  private loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.filterProducts = [...data];

        this.totalRecords = data.length;
        this.paginateData();
        this.timeoutId = setTimeout(() => {
          this.loadingService.hide();
        }, 100);
      },
      error: (error) => {
        this.loadingService.hide();
        this.messageService.showError('Error loading Products', error.message);
      }
    });
  };
  private loadProductsByType(type: string) {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.filterProductsByType(type);
        this.timeoutId = setTimeout(() => {
          this.loadingService.hide();
        }, 100);
      },
      error: (error) => {
        this.loadingService.hide();
        this.messageService.showError('Error loading Products', error.message);
      }
    });
  };
  private filterProductsByType(type: string) {
    this.filterProducts = this.products.filter(product => {
      return product.type?.toLocaleLowerCase() === type.toLocaleLowerCase();
    });
    // console.log(this.filterProducts);
    this.totalRecords = this.filterProducts.length;
    this.paginateData();
  };

  paginateData() {
    const start = this.first;
    const end = this.first + this.itemsPerPage;
    //render cards
    this.pagedProducts = this.filterProducts.slice(start, end);
  };
  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.itemsPerPage = event.rows ?? 0;
    this.paginateData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  isShowFilter() {
    this.isShow = !this.isShow;
  };
  isShowSort() {
    this.showSort = !this.showSort;
  };

  onSortChanged(event: { source: string; value: string[] }) {
    const selected = event.value[0];
    let sorted = [...this.filterProducts];
  
    switch (selected) {
      case 'Low to high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'High to low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'New to old':
        sorted.sort((a, b) => this.safeDate(b.createdAt) - this.safeDate(a.createdAt));
        break;
      case 'Old to new':
        sorted.sort((a, b) => this.safeDate(a.createdAt) - this.safeDate(b.createdAt));
        break;
    };
  
    this.filterProducts = sorted;
    this.totalRecords = sorted.length;
    this.paginateData();
  };
  safeDate(dateStr?: string): number {
    return dateStr ? new Date(dateStr).getTime() : 0;
  };
  
}
