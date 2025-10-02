import { TestBed } from '@angular/core/testing';

import { CartService } from './cart-service';
import { MessageService } from 'primeng/api';
import { Signal, signal } from '@angular/core';
import { CartItem } from '../../models/common.model';
import { customMessageService } from '../message-service/message-service';

describe('CartService', () => {
  let service: CartService;
  let mockItems: Signal<CartItem[]>;
  let message: customMessageService;

  const setCartItems = (items: Signal<CartItem[]>) => {
    (service as any)['cartItems'].set(items());
  };
  const getItem = (id: string): CartItem | undefined =>
    (service as any).cartItems().find((i: CartItem) => i.id === id);  

  function clearCartStorage(service: CartService): void {
    localStorage.removeItem((service as any).CART_STORAGE_KEY);
  };  

  beforeEach(() => {
    mockItems = signal([
      { id: '1', name: 'hạt mèo', quantity: 2, price: 50, sale: 0, currentStock: 10 },
      { id: '2', name: 'pate', quantity: 1, price: 60, sale: 0, currentStock: 5 }
    ]);

    TestBed.configureTestingModule({
      providers: [
        MessageService,
      ]
    });

    service = TestBed.inject(CartService);
    message = TestBed.inject(customMessageService);

    setCartItems(mockItems);
  });

  afterEach(() => {
    clearCartStorage(service);
  });  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Cart calculations', () => {
    it('should calculate totalItems correctly', () => {
      expect(service.totalItems()).toBe(3);
    });

    it('should calculate totalPrice correctly', () => {
      expect(service.totalPrice()).toBe(160);
    });

    it('should return 0 for totalPrice when cart is empty', () => {
      setCartItems(signal([]));
      expect(service.totalPrice()).toBe(0);
    });

    it('should return true for isEmpty when cart is empty', () => {
      setCartItems(signal([]));
      expect(service.isEmpty()).toBeTrue();
    });

    it('should return false for isEmpty when cart has items', () => {
      expect(service.isEmpty()).toBeFalse();
    });
  });

  describe('Mini cart visibility', () => {
    it('should toggle mini cart visibility', () => {
      expect((service as any)._visibleMiniCart.value).toBeFalse();
      service.toggleMiniCart();
      expect((service as any)._visibleMiniCart.value).toBeTrue();
      service.toggleMiniCart();
      expect((service as any)._visibleMiniCart.value).toBeFalse();
    });

    it('should set mini cart visibility to true', () => {
      service.setCartVisibility(true);
      expect((service as any)._visibleMiniCart.value).toBeTrue();
    });

    it('should set mini cart visibility to false', () => {
      service.setCartVisibility(false);
      expect((service as any)._visibleMiniCart.value).toBeFalse();
    });
  }); 

  describe('Item addition', () => {
    it('should add new item to cart when quantity is valid', () => {
      const product = { id: '3', name: 'hạt mèo', price: 50, sale: 0, currentStock: 5 };
      const result = service.addItem(product, 2);

      expect(result).toBeTrue();
      expect((service as any).cartItems().length).toBe(3);
      expect(getItem('3')?.quantity).toBe(2);
    });

    it('should not add item if quantity exceeds stock', () => {
      const warnSpy = spyOn(message, 'showWarn');
      const product = { id: '4', name: 'pate', price: 60, sale: 0, currentStock: 1 };
      const result = service.addItem(product, 3);

      expect(result).toBeFalse();
      expect(getItem('4')).toBeUndefined();
      expect(warnSpy).toHaveBeenCalledWith('Cannot increase quantity', 'Only 1 items left in stock.');
    });

    it('should increase quantity of existing item if within stock', () => {
      const product = { id: '5', name: 'xương gặm', price: 40, sale: 0, currentStock: 10 };
      service.addItem(product, 2);
      const result = service.addItem(product, 3);

      expect(result).toBeTrue();
      expect(getItem('5')?.quantity).toBe(5);
    });

    it('should not increase quantity if it exceeds stock', () => {
      const warnSpy = spyOn(message, 'showWarn');
      const product = { id: '6', name: 'cá khô', price: 30, sale: 0, currentStock: 5 };
      service.addItem(product, 4);
      const result = service.addItem(product, 2);

      expect(result).toBeFalse();
      expect(getItem('6')?.quantity).toBe(4);
      expect(warnSpy).toHaveBeenCalledWith('Cannot increase quantity', 'Only 1 items left in stock.');
    });
  });

  describe('Quantity updates', () => {
    it('should update quantity of existing item', () => {
      service.updateQuantity('1', 5);
      expect(getItem('1')?.quantity).toBe(5);
    });

    it('should increase quantity if stock allows', () => {
      const result = service.increaseQuantity('1');
      expect(result).toBeTrue();
      expect(getItem('1')?.quantity).toBe(3);
    });

    it('should not increase quantity if stock is full', () => {
      setCartItems(signal([
        { id: '2', name: 'pate', quantity: 5, price: 60, sale: 0, currentStock: 5 }
      ]));

      const warnSpy = spyOn(message, 'showWarn');
      const result = service.increaseQuantity('2');

      expect(result).toBeFalse();
      expect(getItem('2')?.quantity).toBe(5);
      expect(warnSpy).toHaveBeenCalledWith('Cannot increase quantity', 'Only 5 items left in stock.');
    });

    it('should return false if item not found', () => {
      const result = service.increaseQuantity('999');
      expect(result).toBeFalse();
    });

    it('should decrease quantity if greater than 1', () => {
      const spy = spyOn(service, 'updateQuantity');
      service.decreaseQuantity('1');
      expect(spy).toHaveBeenCalledWith('1', 1);
    });

    it('should not update quantity if it is 1', () => {
      const spy = spyOn(service, 'updateQuantity');
      service.decreaseQuantity('2');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Price calculation', () => {
    it('should return original price if no sale', () => {
      const item: CartItem = {
        id: '1', name: 'hạt mèo', quantity: 1, price: 100, sale: 0, currentStock: 10
      };
      expect(service.getFinalPrice(item)).toBe(100);
    });

    it('should return discounted price if sale > 0', () => {
      const item: CartItem = {
        id: '2', name: 'pate', quantity: 1, price: 200, sale: 25, currentStock: 5
      };
      expect(service.getFinalPrice(item)).toBe(150);
    });
  });

  describe('Cart queries', () => {
    it('should return true if item is in cart', () => {
      expect(service.isIncart('1')).toBeTrue();
      expect(service.isIncart('2')).toBeTrue();
    });
  
    it('should return false if item is not in cart', () => {
      expect(service.isIncart('999')).toBeFalse();
    });
  
    it('should return correct quantity if item exists', () => {
      expect(service.getItemQuantity('1')).toBe(2);
      expect(service.getItemQuantity('2')).toBe(1);
    });
  
    it('should return 0 if item does not exist', () => {
      expect(service.getItemQuantity('999')).toBe(0);
    });
  });

  describe('CartService - saveCartToLocal - loadCartFormLocal', () => {
    it('should load cart items from localStorage', () => {
      const storedItems: CartItem[] = mockItems();
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedItems));
    
      const result = (service as any).loadCartFormLocal();
      expect(result.length).toBe(2);
      expect(result[0].name).toBe('hạt mèo');
      expect(result[0].price).toBe(50);
    });
    it('should return empty array and log error when JSON.parse fails', () => {
      const malformedJson = 'this is not valid JSON';
      spyOn(localStorage, 'getItem').and.returnValue(malformedJson);
      const spyConsole = spyOn(console, 'error');
      const result = (service as any).loadCartFormLocal();
  
      expect(result).toEqual([]);
      expect(spyConsole).toHaveBeenCalledWith(
        'Error loading cart form storage',
        jasmine.any(SyntaxError)
      );
    });  
  
    it('should save sanitized cart items to localStorage', () => {
      const spySetItem = spyOn(localStorage, 'setItem');
      const items: CartItem[] = [
        { id: '1', name: 'hạt mèo', price: 50, sale: 0, quantity: 2, currentStock: 10 }
      ];
    
      (service as any).saveCartToLocal(items);
      expect(spySetItem).toHaveBeenCalledWith(
        (service as any).CART_STORAGE_KEY,
        JSON.stringify(items)
      );
    });
    it('should log error when localStorage.setItem throws', () => {
      const items: CartItem[] = [
        { id: '1', name: 'hạt mèo', quantity: 2, price: 50, sale: 0, currentStock: 10 }
      ];
      spyOn(localStorage, 'setItem').and.throwError('Storage quota exceeded');
      const spyConsole = spyOn(console, 'error');
      (service as any).saveCartToLocal(items);
  
      expect(spyConsole).toHaveBeenCalledWith(
        'Error saving cart to storage',
        jasmine.any(Error)
      );
    });  
    
    it('should sanitize cart item correctly', () => {
      const sanitized = (service as any).sanitizeCartItem(mockItems()[0]);
      expect(sanitized.price).toBe(50);
      expect(sanitized.quantity).toBe(2);
      expect(sanitized.currentStock).toBe(10);
    });
    
    it('should remove item by id from cart', () => {
      (service as any).removeItem('1');
      const items = (service as any).cartItems();
      expect(items.length).toBe(1);
      expect(items[0].id).toBe('2');
    });
  
    it('should clear cart items and remove from localStorage', () => {
      const spyRemoveItem = spyOn(localStorage, 'removeItem');
      const spySet = spyOn((service as any).cartItems, 'set');
      (service as any).clearCart();
    
      expect(spySet).toHaveBeenCalledWith([]);
      expect(spyRemoveItem).toHaveBeenCalledWith((service as any).CART_STORAGE_KEY);
    });
  })

  

});
