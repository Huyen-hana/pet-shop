import { TestBed } from '@angular/core/testing';

import { ProductState } from './product-state';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ProductService } from '../product-service/product-service';
import { Loading } from '../loading/loading';
import { customMessageService } from '../message-service/message-service';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Order } from '../../models/order.model';

describe('ProductState', () => {
  let service: ProductState;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let loadingSpy: jasmine.SpyObj<Loading>;
  let messageServiceSpy: jasmine.SpyObj<customMessageService>;

  beforeEach(() => {
    productServiceSpy = jasmine.createSpyObj('ProductService', [ 'getOrder' ]);
    loadingSpy = jasmine.createSpyObj('Loading', [ 'show', 'hide' ]);
    messageServiceSpy = jasmine.createSpyObj('customMessageService', ['showError']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        MessageService,
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Loading, useValue: loadingSpy },
        { provide: customMessageService, useValue: messageServiceSpy }
      ]
    });
    service = TestBed.inject(ProductState);
    service.reccentSales = signal([]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load orders and update reccentSales signal', () => {
    const mockOrders = structuredClone([
      {
        cart: [
          {
            productId: '1',
            productName: 'Pate',
            unitPrice: 15,
            quantity: 2,
            imageUrl: ''
          }
        ]
      }
    ]) as Order[];    
    
    productServiceSpy.getOrder.and.returnValue(of(mockOrders));
    service.loadOrder();
    expect(loadingSpy.show).toHaveBeenCalled();
    expect(productServiceSpy.getOrder).toHaveBeenCalled();
  
    expect(service.reccentSales()).toEqual([
      mockOrders[0].cart[0],
    ]);
    expect(loadingSpy.hide).toHaveBeenCalled();
  })

  it('should show error when getOrder fails', () => {
    productServiceSpy.getOrder.and.returnValue(throwError(() => new Error('Failed')));
    service.loadOrder();
  
    expect(loadingSpy.show).toHaveBeenCalled();
    expect(messageServiceSpy.showError).toHaveBeenCalledWith('Error', 'Unable to load cart data');
    expect(loadingSpy.hide).toHaveBeenCalled();
  });
  
});
