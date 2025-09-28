import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CartService } from '../../../../shared/services/cart-service/cart-service';
import { ProductService } from '../../../../shared/services/product-service/product-service';
import { customMessageService } from '../../../../shared/services/message-service/message-service';
import { SearchService } from '../../../../shared/services/search-service/search-service';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Product } from '../../../../shared/models/product.model';
import { of, throwError } from 'rxjs';

describe('Header', () => {

  let component: Header;
  let fixture: ComponentFixture<Header>;
  let httpMock: HttpTestingController;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        provideRouter([]),
        provideAnimations(),
        MessageService,
        CartService,
        ProductService,
        customMessageService,
        SearchService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    
    productService = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });


  it('should create Header component', () => {
    expect(component).toBeTruthy();
  });
  it('should render logo image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logoImg = compiled.querySelector('img');
    expect(logoImg).toBeTruthy();
    expect(logoImg?.getAttribute('src')).toContain('Veterinary-Logo');
  });

  it('should load all products and assign to allProducts', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Dog Food' },
      { id: 2, name: 'Cat Toy' }
    ] as Product[];
  
    spyOn(productService, 'getAll').and.returnValue(of(mockProducts));
    component.ngOnInit();
    expect(component.allProducts).toEqual(mockProducts);
  });
  it('should show error message when productService.getAll() fails', () => {
    const errorResponse = new ErrorEvent('Network error');
    spyOn(productService, 'getAll').and.returnValue(throwError(() => errorResponse));
    const spy = spyOn(component['messService'], 'showError');
  
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('Error', 'Failed to load products');
  });
  
  
  it('should return total items from cartService via computed signal', () => {
    spyOn(component['cartService'], 'totalItems').and.returnValue(4);
    expect(component.totalItems()).toBe(4);
  });  

  it('should hide nav when scrollY > 138', () => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(150);
    component.onScroll();
    expect(component.isNavHidden).toBeTrue();
  });  
  it('should show nav when scrollY <= 138', () => {
    spyOnProperty(window, 'scrollY').and.returnValue(20);
    component.onScroll();
    expect(component.isNavHidden).toBeFalse();
  });

  it('should return true when current route is /main/cart', () => {
    component['router'] = { url: '/main/cart' } as any;
    expect(component.isCartPage).toBeTrue();
  });
  it('should return false when current route is not /main/cart', () => {
    component['router'] = { url: '/main/home' } as any;
    expect(component.isCartPage).toBeFalse();
  });

  it('should call toggleMiniCart when not on cart page', () => {
    component['router'] = { url: '/main/home' } as any;
    const spy = spyOn(component['cartService'], 'toggleMiniCart');
    component.toggleMiniCart();
    expect(spy).toHaveBeenCalled();
  });
  it('should NOT call toggleMiniCart when on cart page', () => {
    component['router'] = { url: '/main/cart' } as any;
    const spy = spyOn(component['cartService'], 'toggleMiniCart');
    component.toggleMiniCart();
    expect(spy).not.toHaveBeenCalled();
  });
  
  it('should call searchService.toggle when toggleSearch is invoked', () => {
    const spy = spyOn(component['searchService'], 'toggle');
    component.toggleSearch();
    expect(spy).toHaveBeenCalled();
  });
  
});
