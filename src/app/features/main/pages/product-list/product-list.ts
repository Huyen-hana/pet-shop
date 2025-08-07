import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { Paginator } from '../../../../shared/components/layout/paginator/paginator/paginator';
import { PaginatorState } from 'primeng/paginator';
import { ProductService } from '../../../../shared/services/product-service/product-service';
import { Subscription } from 'rxjs';
import { ProductCard } from '../../../../shared/components/bussiness/products/product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, Paginator],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  productService = inject(ProductService);
  subscript: Subscription | undefined;
  products: Product[] = [];
  pagedProducts: Product[] = [];

  itemsPerPage: number = 10;  //match rowPerOptions!
  totalRecords: number = 0;
  rowPerOptions: number [] = [10, 15];
  first: number = 0;

  ngOnInit(): void {
    this.allProducts();
  };
  ngOnDestroy(): void {
    if (this.subscript) {
      this.subscript.unsubscribe();
    }
  };

  allProducts() {
    this.subscript = this.productService.getAll().subscribe((products: Product[]) => {
      this.products = products;
      this.totalRecords = this.products.length;
      this.paginateData();
    })
  };
  paginateData() {
    const start = this.first;
    const end = this.first + this.itemsPerPage;
    //render cards
    this.pagedProducts = this.products.slice(start, end);
  };
  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.itemsPerPage = event.rows ?? 0;
    this.paginateData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}
