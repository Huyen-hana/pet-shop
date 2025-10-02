import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPage } from './cart-page';
import { MessageService } from 'primeng/api';
import { provideRouter } from '@angular/router';
import { signal, Signal } from '@angular/core';
import { CartItem } from '../../../../shared/models/common.model';
import { CartService } from '../../../../shared/services/cart-service/cart-service';

describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;
  let mockCartService: any;
  let mockItems: Signal<CartItem[]>;

  beforeEach(async () => {
    mockItems = signal([
      { id: 1, name: 'hạt mèo', quantity: 2, price: 50, sale: 0, currentStock: 10 },
      { id: 2, name: 'pate', quantity: 1, price: 60, sale: 0, currentStock: 5 }
    ]);
    mockCartService = jasmine.createSpyObj<CartService>('CartService', [
      'setCartVisibility',
      'getItemQuantity',
      'getTotalPrice',
      'isEmpty',
      'totalPrice',
      'getDiscountedPrice',
      'isIncart',
      'increaseQuantity',
      'decreaseQuantity',
      'clearCart' 
    ]);
    mockCartService.items = mockItems;
    
    await TestBed.configureTestingModule({
      imports: [CartPage],
      providers: [
        MessageService,
        provideRouter([]),
        { provide: CartService, useValue: mockCartService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('increaseQuant()', () => {
    it('should increase quantity if item is in cart', () => {
      mockCartService.isIncart.and.returnValue(true);
      component.increaseQuant('1');

      expect(mockCartService.isIncart).toHaveBeenCalledWith('1');
      expect(mockCartService.increaseQuantity).toHaveBeenCalledWith('1');
    });
    it('should not increase quantity if item is not in cart', () => {
      mockCartService.isIncart.and.returnValue(false);
      component.increaseQuant('999');

      expect(mockCartService.isIncart).toHaveBeenCalledWith('999');
      expect(mockCartService.increaseQuantity).not.toHaveBeenCalled();
    });
  });
  
  describe('decreaseQuant()', () => {
    it('should decrease quantity if item is in cart', () => {
      mockCartService.isIncart.and.returnValue(true);
      component.decreaseQuant('1');

      expect(mockCartService.isIncart).toHaveBeenCalledWith('1');
      expect(mockCartService.decreaseQuantity).toHaveBeenCalledWith('1');
    });
    it('should not decrease quantity if item is not in cart', () => {
      mockCartService.isIncart.and.returnValue(false);
      component.decreaseQuant('999');

      expect(mockCartService.isIncart).toHaveBeenCalledWith('999');
      expect(mockCartService.decreaseQuantity).not.toHaveBeenCalled();
    });
  });
  
  it('should clear cart when clearAll is called', () => {
    mockCartService.clearCart = jasmine.createSpy();
    component.clearAll();
    expect(mockCartService.clearCart).toHaveBeenCalled();
  });  
  
});
