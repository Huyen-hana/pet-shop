import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dataview } from './dataview';
import { MessageService } from 'primeng/api';
import { CartService } from '../../../../services/cart-service/cart-service';

describe('Dataview', () => {
  let component: Dataview;
  let fixture: ComponentFixture<Dataview>;
  let cartSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    cartSpy = jasmine.createSpyObj<CartService>('CartService', [
      'items',
      'getItemQuantity',
      'getTotalPrice'
    ]);
    cartSpy.items.and.returnValue([
      { id: '1', name: 'hạt mèo', quantity: 2, price: 50, sale: 0, currentStock: 10 },
      { id: '2', name: 'pate', quantity: 1, price: 60, sale: 0, currentStock: 5 }
    ]);

    await TestBed.configureTestingModule({
      imports: [Dataview],
      providers: [
        MessageService,
        { provide: CartService, useValue: cartSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dataview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return cart items from CartService', () => {
    const products = component.products;
    expect(products.length).toBe(2);
    expect(products[0].name).toBe('hạt mèo');
    expect(products[1].name).toBe('pate');
  });
});
