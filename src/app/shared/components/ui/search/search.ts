import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { SearchService } from '../../../services/search-service/search-service';

@Component({
  selector: 'app-search',
  imports: [ FormsModule, AutoCompleteModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  private router = inject(Router);
  private searchService = inject(SearchService);
  filteredProduct: Product[] = [];
  searchText: string = '';

  @Input() allProducts: Product[] = [];
  @Output() searchResults = new EventEmitter<Product[]>();

  private searchTerms = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.initializeSearchStream();
  };
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
 
  private initializeSearchStream(): void {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((term) => this.removeVietnameseMarks(term.toLowerCase())),
      map((query) =>
        this.allProducts.filter((product) =>
          this.removeVietnameseMarks(product.name.toLowerCase()).includes(query)
        )
      ),
      takeUntil(this.destroy$)
    ).subscribe((results) => {
      this.filteredProduct = results;
      // this.searchResults.emit(results);
    });
  };

  onSearch(event: any) {
    this.searchText = event.query;
    this.searchTerms.next(event.query);
  };
  onSelectProduct(event: any) {
    const productId = event?.value?.id;
    if (productId) {
      this.router.navigate(['/main/products', productId]);
      this.searchService.hide();
    };
    this.clearSearch();
  };
  clearSearch() {
    this.searchText = '';
    this.filteredProduct = [];
  };
  
  private removeVietnameseMarks(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };

  autocomplete = {
    dropdown: {
      width: '100%'
    }
  }
}
