import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { Paginator } from '../../../../shared/components/layout/paginator/paginator/paginator';
import { PaginatorState } from 'primeng/paginator';
import { ProductService } from '../../../../shared/services/product-service/product-service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ProductCard } from '../../../../shared/components/bussiness/products/product-card/product-card';
import { Category } from '../../../../shared/models/common.model';
import { FilterPanel } from '../../../../shared/components/layout/filter-panel/filter-panel';
import { ActivatedRoute } from '@angular/router';
import { customMessageService } from '../../../../shared/services/message-service/message-service';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, Paginator, FilterPanel],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  productService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);
  messageService = inject(customMessageService);
  private destroys$ = new Subject<void>()
  isShow: boolean = false;
  isShowSort: boolean = false;
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
    { cateId: 'Giá từ cao đến thấp' },
    { cateId: 'Giá từ thấp đến cao' },
    { cateId: 'Ngày từ mới đến cũ' },
    { cateId: 'Ngày từ cũ đến mới' }
  ]

  ngOnInit(): void {
    this.allProducts();
  };
  ngOnDestroy(): void {
    this.destroys$.next();
    this.destroys$.complete();
  };

  allProducts() {
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
        // this.products = data;
        this.filterProducts = [...data];

        this.totalRecords = this.products.length;
        this.paginateData();
      },
      error: (error) => {
        this.messageService.showError('Error loading Products', error.message);
      }
    });
  };
  private loadProductsByType(type: string) {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.filterProductsByType(type);
      },
      error: (error) => {
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
  }
}
