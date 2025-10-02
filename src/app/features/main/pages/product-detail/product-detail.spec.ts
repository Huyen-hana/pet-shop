import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetail } from './product-detail';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../../shared/services/product-service/product-service';
import { customMessageService } from '../../../../shared/services/message-service/message-service';
import { of, Subject, throwError } from 'rxjs';
import { Product } from '../../../../shared/models/product.model';
import { CartService } from '../../../../shared/services/cart-service/cart-service';

describe('ProductDetail', () => {
  let component: ProductDetail;
  let fixture: ComponentFixture<ProductDetail>;

  let mockProductService: any;
  let mockMessageService: any;
  let mockCartItemService: any;

  const mockProduct: Product = {
    id: 10,
    name: 'Test Product',
    type: 'cat', // hoặc 'cat' nếu dùng union type
    brand: 'TestBrand',
    price: 999,
    currentStock: 20,
    variants: []
  };
  
  beforeEach(async () => {

    mockProductService = {
      getProductById: jasmine.createSpy('getProductById').and.returnValue(of(mockProduct))
    };
    mockMessageService = jasmine.createSpyObj('customMessageService', [
      'showWarn',
      'showError',
      'showSuccess'
    ]);  
    mockCartItemService = jasmine.createSpyObj<CartService>('CartItemService', [
      'addItem',
      'getTotalPrice',
      'isIncart',
      'getItemQuantity',
      'updateQuantity'
    ]);
    mockCartItemService.getTotalPrice.and.returnValue(999);  

    await TestBed.configureTestingModule({
      imports: [ProductDetail],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: {
          params: of({ id: '10' })
        } },
        { provide: ProductService, useValue: mockProductService },
        { provide: customMessageService, useValue: mockMessageService },
        { provide: CartService, useValue: mockCartItemService },
        MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    component.destroy$ = new Subject<void>();
    component.selectedQuantities = {};

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product and generate images', async () => {
    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    component.destroy$ = new Subject<void>();
    component.renderProduct();
  
    expect(mockProductService.getProductById).toHaveBeenCalledWith(10);
    expect(component.product).toEqual(mockProduct);
    expect(component.images.length).toBe(5);
    expect(component.images[0].itemImageSrc).toContain('id10.webp');
  });
  it('should handle error when getProductById fails', () => {
    const errorResponse = { message: 'Product not found' };
    mockProductService.getProductById.and.returnValue(throwError(() => errorResponse));
    component.renderProduct();
    expect(mockMessageService.showError).toHaveBeenCalledWith('', 'Product not found');
  });

  it('should call cartItemService.addItem with product', () => {
    component.addProduct(mockProduct);
    expect(mockCartItemService.addItem).toHaveBeenCalledWith(mockProduct);
  });
  
  it('should increase quantity for productId', () => {
    component.selectedQuantities = { '10': 2 };
    component.increaseItemQuant('10');
    expect(component.selectedQuantities['10']).toBe(3);
  });
  it('should default quantity to 1 if not set in selectedQuantities', () => {
    component.selectedQuantities = {};
    mockCartItemService.isIncart.and.returnValue(false);
    mockCartItemService.addItem.and.returnValue(true);
    component.addToCart(mockProduct);
  
    expect(mockCartItemService.addItem).toHaveBeenCalledWith(mockProduct, 1);
    expect(mockMessageService.showSuccess).toHaveBeenCalledWith('Success', 'Product has been added to cart');
  });
  
  it('should initialize quantity to 2 if not set', () => {
    component.selectedQuantities = {};
    component.increaseItemQuant('99');
    expect(component.selectedQuantities['99']).toBe(2);
  });

  it('should decrease quantity when current > 1', () => {
    component.selectedQuantities = { '10': 3 };
    component.decreaseItemQuant('10');
    expect(component.selectedQuantities['10']).toBe(2);
  });
  it('should not decrease quantity when current = 1', () => {
    component.selectedQuantities = { '10': 1 };
    component.decreaseItemQuant('10');
    expect(component.selectedQuantities['10']).toBe(1);
  });
  it('should not set quantity if productId not in selectedQuantities', () => {
    component.selectedQuantities = {};
    component.decreaseItemQuant('99');
    expect(component.selectedQuantities['99']).toBeUndefined();
  });

  it('should update quantity if product is in cart and stock is sufficient', () => {
    component.selectedQuantities = { '10': 2 };
    mockCartItemService.isIncart.and.returnValue(true);
    mockCartItemService.getItemQuantity.and.returnValue(3);
    component.addToCart(mockProduct);
  
    expect(mockCartItemService.updateQuantity).toHaveBeenCalledWith(10, 5);
    expect(mockMessageService.showSuccess).toHaveBeenCalledWith('Success', 'Product has been added to cart');
    expect(component.selectedQuantities['10']).toBeUndefined();
  });
  it('should show warning if total quantity exceeds stock for existing cart item', () => {
    component.selectedQuantities = { '10': 2 };
    mockCartItemService.isIncart.and.returnValue(true);
    mockCartItemService.getItemQuantity.and.returnValue(19);
    component.addToCart(mockProduct);
  
    expect(mockMessageService.showWarn).toHaveBeenCalledWith(
      'Cannot add to cart',
      'Only 1 items left in stock.'
    );
    expect(mockCartItemService.updateQuantity).not.toHaveBeenCalled();
  });
  it('should add product if not in cart and stock is sufficient', () => {
    component.selectedQuantities = { '10': 2 };
    mockCartItemService.isIncart.and.returnValue(false);
    mockCartItemService.addItem.and.returnValue(true);
    component.addToCart(mockProduct);
  
    expect(mockCartItemService.addItem).toHaveBeenCalledWith(mockProduct, 2);
    expect(mockMessageService.showSuccess).toHaveBeenCalledWith('Success', 'Product has been added to cart');
    expect(component.selectedQuantities['10']).toBeUndefined();
  });
  it('should show warning if quantity exceeds stock for new cart item', () => {
    component.selectedQuantities = { '10': 25 };
    mockCartItemService.isIncart.and.returnValue(false);
    component.addToCart(mockProduct);
  
    expect(mockMessageService.showWarn).toHaveBeenCalledWith(
      'Cannot add to cart',
      'Only 20 items left in stock.'
    );
    expect(mockCartItemService.addItem).not.toHaveBeenCalled();
  });
  
  
});
