import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CartItem } from '../../models/common.model';
import { customMessageService } from '../message-service/message-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private message = inject(customMessageService);
  private readonly CART_STORAGE_KEY = 'shopping-cart';
  private cartItems = signal<CartItem[]>(this.loadCartFormLocal());

  readonly items = this.cartItems.asReadonly();
  readonly totalItems = computed(() => {
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  }
  );
  readonly totalPrice = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + (this.getFinalPrice(item) * item.quantity), 0);
  });
  
  readonly isEmpty = computed(() => this.cartItems().length === 0);

  constructor() {
    effect(() => {
      this.saveCartToLocal(this.cartItems());
    });
  };

  addItem(product: Omit<CartItem, 'quantity'> | any , quantity: number = 1): boolean {
    const cartItem: Omit<CartItem, 'quantity'> = {
      id: product.id,
      name: product.name,
      price: product.price,
      sale: product.sale || 0,
      currentStock: product.currentStock || 0,
      // ...(product.img && { image: product.img })
      image: `assets/images/products/img/id${product.id}-thumb.jpg`
    };
    const currentItems = this.cartItems();
    const existingItemIndex = currentItems.findIndex(item => item.id === cartItem.id);

    if (existingItemIndex >= 0) {
      const currentQuantity = currentItems[existingItemIndex].quantity;
      const newQuantity = currentQuantity + quantity;

      if(newQuantity > cartItem.currentStock) {
        this.message.showWarn('Cannot increase quantity', `Only ${cartItem.currentStock - currentQuantity} items left in stock.`);
        return false;
      };

      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };
      this.cartItems.set(updatedItems);
    } else {
      if (quantity > cartItem.currentStock) {
        this.message.showWarn('Cannot increase quantity', `Only ${cartItem.currentStock} items left in stock.`);
        return false;
      };
      this.cartItems.set([...currentItems, { ...cartItem, quantity }]);
    };
    return true;
  };

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      // this.removeItem(productId);
      return;
    } else {
      const currentItems = this.cartItems();
      const updatedItems = currentItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      this.cartItems.set(updatedItems);
    };
  };
  increaseQuantity(productId: string): boolean {
    const currentItems = this.cartItems();
    const item = currentItems.find(item => item.id === productId);
    if (!item) {
      return false;
    };
    if (item.quantity >= item.currentStock) {
      this.message.showWarn('Cannot increase quantity', `Only ${item.currentStock} items left in stock.`);
      return false;
    }
    this.updateQuantity(productId, item.quantity + 1);
      return true;
  };

  decreaseQuantity(productId: string): void {
    const currentItems = this.cartItems();
    const item = currentItems.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      this.updateQuantity(productId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      // this.removeItem(productId);
    }
  };

  getDiscountedPrice(price: number, sale?: number): number {
    const safePrice = price ?? 0;
    const safeSale = sale ?? 0;  
    return safePrice - (safePrice * safeSale / 100);
  };
  getTotalPrice(price: number, sale: number, quantity: number = 1): number {
    const safePrice = price ?? 0;
    const safeSale = sale ?? 0;
    const safeQuantity = quantity ?? 1;
  
    const discountedPrice = safePrice - (safePrice * safeSale / 100);
    return discountedPrice * safeQuantity;  
  };

  getFinalPrice(item: CartItem): number {
    if (item.sale > 0) {
      return item.price - (item.price * item.sale / 100)
    };
    return item.price;
  };

  isIncart(productId: string): boolean {
    return this.cartItems().some(item => item.id === productId);
  };
  getItemQuantity(productId: string): number {
    const item = this.cartItems().find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  private loadCartFormLocal(): CartItem[] {
    try {
      const stored = localStorage.getItem(this.CART_STORAGE_KEY);
      if (stored) {
        const parsedItems = JSON.parse(stored);
        return parsedItems.map((item: any) => this.sanitizeCartItem(item));
      }
      return [];
    } catch (err) {
      console.error('Error loading cart form storage', err);
      return [];
    };
  };
  private saveCartToLocal(items: CartItem[]): void {
    try {
      const sanitizedItems = items.map(item => this.sanitizeCartItem(item));
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(sanitizedItems));
    } catch (err) {
      console.error('Error saving cart to storage', err);
    };
  };
  private sanitizeCartItem(item: any): CartItem {
    const sanitized: CartItem = {
      id: item.id,
      name: item.name,
      price: Number(item.price) || 0,
      sale: Number(item.sale) || 0,
      quantity: Number(item.quantity) || 1,
      currentStock: Number(item.currentStock) || 0
    };
    if (item.image && typeof item.image === 'string' && item.image.trim()) {
      sanitized.image = item.image;
    };
    return sanitized;
  };

  clearCart() {
    this.cartItems.set([]);
    localStorage.removeItem(this.CART_STORAGE_KEY);
  };
}
