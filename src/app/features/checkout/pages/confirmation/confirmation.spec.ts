import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Confirmation } from './confirmation';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { customMessageService } from '../../../../shared/services/message-service/message-service';
import { UserService } from '../../../../shared/services/user-service/user-service';
import { CartService } from '../../../../shared/services/cart-service/cart-service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('Confirmation', () => {
  let component: Confirmation;
  let fixture: ComponentFixture<Confirmation>;

  let cartServiceSpy: jasmine.SpyObj<any>;
  let userServiceSpy: jasmine.SpyObj<any>;
  let messServiceSpy: jasmine.SpyObj<any>;

  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj('CartService', [
      'totalPrice',
      'items',
      'getDiscountedPrice',
      'clearCart',
      'isEmpty'
    ]);
    userServiceSpy = jasmine.createSpyObj('UserService', ['createOrder']);
    messServiceSpy = jasmine.createSpyObj('customMessageService', ['showSuccess', 'showError']);

    await TestBed.configureTestingModule({
      imports: [Confirmation],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        provideAnimationsAsync(),
        MessageService,
        { provide: CartService, useValue: cartServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: customMessageService, useValue: messServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Confirmation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalPrice correctly', () => {
    component.shippingPrice.set(20);
    cartServiceSpy.totalPrice.and.returnValue(100);
    expect(component.totalPrice()).toBe(120);
  });

  it('should update shippingPrice when onPriceChange is called', () => {
    component.onPriceChange(50);
    expect(component.shippingPrice()).toBe(50);
  });

  it('should submit order and handle success response', fakeAsync(() => {
    const mockOrder = {
      orderId: 'FAKE123',
      phone: '0123456789',
      email: 'test@example.com',
      name: 'Huyen',
      address: '123 Street',
      shippingMethod: 'Express Delivery (HCM) - 1-3 days',
      paymentMethod: 'COD',
      cart: [],
      shippingFee: 20,
      totalAmount: 180,
      orderStatus: 'Pending Confirmation',
      createdAt: new Date().toISOString()
    };
  
    component.orderForm = {
      value: {
        phone: mockOrder.phone,
        email: mockOrder.email,
        username: mockOrder.name,
        address: mockOrder.address,
        selectedCategory1: { name: mockOrder.shippingMethod, price: mockOrder.shippingFee },
        selectedCategory2: { key: mockOrder.paymentMethod }
      },
      reset: jasmine.createSpy('reset')
    } as any;
  
    cartServiceSpy.items.and.returnValue([
      { id: 1, name: 'Product A', price: 100, sale: 10, quantity: 2, image: 'img-a.jpg', currentStock: 20 }
    ]);
    cartServiceSpy.getDiscountedPrice.and.returnValue(90);
    cartServiceSpy.totalPrice.and.returnValue(180);
    userServiceSpy.createOrder.and.returnValue(of(mockOrder));
    cartServiceSpy.clearCart.and.stub();
    messServiceSpy.showSuccess.and.stub();
    spyOn(component, 'generateFakeOrderId').and.returnValue('FAKE123');
  
    component.onSubmitForm(new Event('submit'));
    tick();
  
    expect(userServiceSpy.createOrder).toHaveBeenCalled();
    expect(cartServiceSpy.clearCart).toHaveBeenCalled();
    expect(component.orderForm.reset).toHaveBeenCalled();
    expect(messServiceSpy.showSuccess).toHaveBeenCalledWith('Success', 'Order created successfully!');
    expect(component.isLoading).toBeFalse();
  }));
  
  it('should handle error response when order creation fails', fakeAsync(() => {
    component.orderForm = {
      value: {
        phone: '0123456789',
        email: 'test@example.com',
        username: 'Huyen',
        address: '123 Street',
        selectedCategory1: { name: 'Fast', price: 20 },
        selectedCategory2: { key: 'COD' }
      },
      reset: jasmine.createSpy('reset')
    } as any;
  
    cartServiceSpy.items.and.returnValue([]);
    cartServiceSpy.getDiscountedPrice.and.returnValue(0);
    cartServiceSpy.totalPrice.and.returnValue(0);
    userServiceSpy.createOrder.and.returnValue(throwError(() => new Error('Server error')));
    messServiceSpy.showError.and.stub();
    spyOn(component, 'generateFakeOrderId').and.returnValue('FAKE123');
  
    component.onSubmitForm(new Event('submit'));
    tick();
  
    expect(component.isLoading).toBeFalse();
    expect(messServiceSpy.showError).toHaveBeenCalledWith('Error', 'Failed to create order. Please try again.');  
  }));

  it('should generate a valid fake order ID', () => {
    const orderId = component.generateFakeOrderId();
    expect(orderId).toMatch(/^ORD-\d{6}-[A-Z0-9]{4}$/);
  
    const parts = orderId.split('-');
    expect(parts.length).toBe(3);
    expect(parts[0]).toBe('ORD');
    expect(parts[1].length).toBe(6);
    expect(parts[2].length).toBe(4);
  });  
})
