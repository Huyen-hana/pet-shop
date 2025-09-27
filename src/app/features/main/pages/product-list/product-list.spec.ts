import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductList } from './product-list';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of, Subject, throwError } from 'rxjs';
import { Loading } from '../../../../shared/services/loading/loading';
import { customMessageService } from '../../../../shared/services/message-service/message-service';
import { ProductService } from '../../../../shared/services/product-service/product-service';

describe('ProductList', () => {

  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  let mockActivatedRoute: any;
  let mockLoadingService: any;
  let mockProductService: any;
  let mockMessageService: any;

  const mockProducts = [
    { id: 1, name: 'C', type: 'cat', price: 100, createdAt: '2023-01-01' },
    { id: 2, name: 'D', type: 'dog', price: 50, createdAt: '2024-01-01' }
  ];
  const sampleProducts = [
    { name: 'A', price: 100, createdAt: '2023-01-01', type: 'cat' as 'cat', brand: 'pet-shop', currentStock: 10, variants: [] },
    { name: 'B', price: 50, createdAt: '2024-01-01', type: 'dog' as 'dog', brand: 'pet-shop', currentStock: 5, variants: [] }
  ];

  function setupSortTest(sortValue: string) {
    component.filterProducts = [...sampleProducts];
    component.paginateData = jasmine.createSpy('paginateData');
    component.onSortChanged({ source: 'drawer-sort', value: [sortValue] });
  }

  beforeEach(async () => {
    mockActivatedRoute = { params: of({ name: 'cat' }) };
    mockLoadingService = {
      show: jasmine.createSpy('show'),
      hide: jasmine.createSpy('hide')
    };
    mockProductService = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of(mockProducts))
    };
    mockMessageService = {
      showError: jasmine.createSpy('showError')
    };

    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        provideAnimationsAsync(),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Loading, useValue: mockLoadingService },
        { provide: customMessageService, useValue: mockMessageService },
        { provide: ProductService, useValue: mockProductService },
        MessageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    component.destroys$ = new Subject<void>();
    component.first = 0;
    component.itemsPerPage = 2;

    fixture.detectChanges();
    component.filterProducts = [...sampleProducts];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Loading and type change', () => {
    it('should call loadingService.show and typeChange with correct param', () => {
      spyOn(component, 'typeChange');
      component.allProducts();
      expect(mockLoadingService.show).toHaveBeenCalled();
      expect(component.currantCate).toBe('cat');
      expect(component.typeChange).toHaveBeenCalledWith('cat');
    });

    it('should call loadProducts when type is "all"', () => {
      spyOn(component as any, 'loadProducts');
      component.typeChange('all');
      expect((component as any).loadProducts).toHaveBeenCalled();
    });

    it('should load products and paginate successfully', () => {
      spyOn(component, 'paginateData');
      jasmine.clock().install();

      (component as any).loadProducts();

      expect(component.filterProducts.length).toBe(2);
      expect(component.totalRecords).toBe(2);
      expect(component.paginateData).toHaveBeenCalled();

      jasmine.clock().tick(101);
      expect(mockLoadingService.hide).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });

    it('should handle error when loading products fails', () => {
      mockProductService.getAll.and.returnValue(throwError(() => ({ message: 'Network error' })));
      (component as any).loadProducts();

      expect(mockLoadingService.hide).toHaveBeenCalled();
      expect(mockMessageService.showError).toHaveBeenCalledWith('Error loading Products', 'Network error');
    });

    it('should handle error when loading products by type fails', () => {
      mockProductService.getAll.and.returnValue(throwError(() => ({ message: 'Server error' })));
      (component as any).loadProductsByType('cat');

      expect(mockLoadingService.hide).toHaveBeenCalled();
      expect(mockMessageService.showError).toHaveBeenCalledWith('Error loading Products', 'Server error');
    });
  });

  describe('Pagination', () => {
    it('should update pagination and scroll to top on page change', () => {
      spyOn(component, 'paginateData');
      const scrollSpy = jasmine.createSpy('scrollTo');
      Object.defineProperty(window, 'scrollTo', {
        value: scrollSpy,
        writable: true
      });
      const event = { first: 5, rows: 10 };
      component.onPageChange(event);

      expect(component.first).toBe(5);
      expect(component.itemsPerPage).toBe(10);
      expect(component.paginateData).toHaveBeenCalled();
      expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('should fallback to 0 when event.first or event.rows is undefined', () => {
      spyOn(component, 'paginateData');
      const scrollSpy = jasmine.createSpy('scrollTo');
      Object.defineProperty(window, 'scrollTo', {
        value: scrollSpy,
        writable: true
      });
      const event = { first: undefined, rows: undefined };
      component.onPageChange(event);

      expect(component.first).toBe(0);
      expect(component.itemsPerPage).toBe(0);
      expect(component.paginateData).toHaveBeenCalled();
      expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
  });

  describe('Sorting products', () => {
    it('should sort by price low to high', () => {
      setupSortTest('Price Low to high');
      expect(component.filterProducts[0].price).toBe(50);
      expect(component.filterProducts[1].price).toBe(100);
      expect(component.totalRecords).toBe(2);
      expect(component.paginateData).toHaveBeenCalled();
    });

    it('should sort by price high to low', () => {
      setupSortTest('Price High to low');
      expect(component.filterProducts[0].price).toBe(100);
      expect(component.filterProducts[1].price).toBe(50);
      expect(component.totalRecords).toBe(2);
      expect(component.paginateData).toHaveBeenCalled();
    });

    it('should sort by createdAt from new to old', () => {
      setupSortTest('New to old');
      expect(component.filterProducts[0].createdAt).toBe('2024-01-01');
      expect(component.filterProducts[1].createdAt).toBe('2023-01-01');
      expect(component.totalRecords).toBe(2);
      expect(component.paginateData).toHaveBeenCalled();
    });

    it('should sort by createdAt from old to new', () => {
      setupSortTest('Old to new');
      expect(component.filterProducts[0].createdAt).toBe('2023-01-01');
      expect(component.filterProducts[1].createdAt).toBe('2024-01-01');
      expect(component.totalRecords).toBe(2);
      expect(component.paginateData).toHaveBeenCalled();
    });
  });
  
});
