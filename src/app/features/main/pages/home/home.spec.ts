import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ProductService } from '../../../../shared/services/product-service/product-service';
import { Loading } from '../../../../shared/services/loading/loading';
import { Product } from '../../../../shared/models/product.model';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockLoadingService: jasmine.SpyObj<Loading>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getAll']);
    mockLoadingService = jasmine.createSpyObj('Loading', ['show', 'hide']);

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: ProductService, useValue: mockProductService },
        { provide: Loading, useValue: mockLoadingService },
        MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    const mockProducts: Product[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      type: 'cat',
      brand: 'BrandX',
      price: 100 + i,
      currentStock: 10,
      variants: []
    }));
    mockProductService.getAll.and.returnValue(of(mockProducts));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe if subscript exists', () => {
    const mockSub = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.subscript = mockSub;
    component.ngOnDestroy();
    expect(mockSub.unsubscribe).toHaveBeenCalled();
  });
  it('should clear timeout if timeoutId exists', () => {
    spyOn(window, 'clearTimeout');
    (component as any).timeoutId = 12345;
    component.ngOnDestroy();

    expect(clearTimeout).toHaveBeenCalledWith(12345);
  });

  it('should fetch products and assign loved/new products', () => {
    spyOn(window, 'setTimeout').and.callFake((handler: TimerHandler) => {
      if (typeof handler === 'function') handler();
      return 123;
    });
    component.getAllProducts();
  
    expect(mockProductService.getAll).toHaveBeenCalled();
    expect(component.products.length).toBe(25);
    expect(component.lovedProducts.length).toBe(10);
    expect(component.newProducts.length).toBe(10);
  });  
  

});
