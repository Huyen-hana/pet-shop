import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard } from './product-card';
import { MessageService } from 'primeng/api';
import { Product } from '../../../../models/product.model';
import { customMessageService } from '../../../../services/message-service/message-service';
import { CartService } from '../../../../services/cart-service/cart-service';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;
  let product: Product;

  let mockCartService: jasmine.SpyObj<CartService>;
  let mockMessService: jasmine.SpyObj<customMessageService>;

  beforeEach(async () => {
    mockCartService = jasmine.createSpyObj('CartService', ['addItem']);
    mockMessService = jasmine.createSpyObj('customMessageService', ['showSuccess']);
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [
        MessageService,
        { provide: CartService, useValue: mockCartService },
        { provide: customMessageService, useValue: mockMessService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    product = {
      id: 1,
      name: 'Test Product',
      type: 'cat',
      brand: 'TestBrand',
      price: 1000,
      currentStock: 10,
      variants: []
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate sale price correctly when product has sale', () => {
    component.product = { ...product, sale: 20 };
    component.showSalePrice();
    expect(component.salePrice).toBe(800);
  });

  it('should add product and show success message', () => {
    mockCartService.addItem.and.returnValue(true);
    component.addProduct(product);
    expect(mockCartService.addItem).toHaveBeenCalledWith(product, 1);
    expect(mockMessService.showSuccess).toHaveBeenCalledWith('Success', 'Product has been added to cart');
  });

  
});
