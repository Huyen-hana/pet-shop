import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCart } from './mini-cart';
import { MessageService } from 'primeng/api';
import { provideRouter, Router } from '@angular/router';
import { CartService } from '../../../../services/cart-service/cart-service';
import { Signal, signal } from '@angular/core';
import { of } from 'rxjs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CartItem } from '../../../../models/common.model';

describe('MiniCart', () => {
  let component: MiniCart;
  let fixture: ComponentFixture<MiniCart>;
  let mockCartService: any;
  let mockItems: Signal<CartItem[]>;
  let router: Router;

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
      'totalPrice'
    ]);
    mockCartService.items = mockItems;
    mockCartService.visibleMiniCart$ = of(true);

    await TestBed.configureTestingModule({
      imports: [MiniCart],
      providers: [
        MessageService,
        provideRouter([]),
        provideAnimationsAsync(),
        { provide: CartService, useValue: mockCartService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniCart);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should reflect cart items from CartService', () => {
    const items = component.cartItems();
    expect(items.length).toBe(2);
    expect(items[0]).toEqual(jasmine.objectContaining({
      id: 1,
      name: 'hạt mèo',
      quantity: 2,
      price: 50
    }));
  });
  
  it('should navigate to product detail and hide drawer', () => {
    component.goProductDetail('123');
    expect(router.navigate).toHaveBeenCalledWith(['/main/products', '123']);
    expect(mockCartService.setCartVisibility).toHaveBeenCalledWith(false);
  });
  it('should navigate to cart page and hide drawer', () => {
    component.goCartPage();
    expect(router.navigate).toHaveBeenCalledWith(['/main/cart']);
    expect(mockCartService.setCartVisibility).toHaveBeenCalledWith(false);
  });
});
