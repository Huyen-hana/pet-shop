import { TestBed } from '@angular/core/testing';

import { ProductService } from './product-service';
import { HttpClient, HttpParams, provideHttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let http: jasmine.SpyObj<HttpClient>;

  const mockProducts: Product[] = [
    { id: 1, name: 'Cat Food', type: 'cat', brand: 'Meow', price: 100, currentStock: 10, variants: [] },
    { id: 2, name: 'Dog Toy', type: 'dog', brand: 'Woof', price: 50, currentStock: 5, variants: [] }
  ];
  const mockProduct: Product = { id: 3, name: 'new product', type: 'dog', brand: 'Woof', price: 50, currentStock: 5, variants: [] };
  const mockOrder: Order[] = [{
    orderId: 'ORD001',
      phone: '0901234567',
      email: 'huyen@example.com',
      name: 'Huyen Nguyen',
      address: '123 Lê Lợi, Quận 1',
      shippingMethod: 'Express Delivery (HCM) - 1-3 days',
      paymentMethod: 'COD',
      cart: [
        {
          productId: 'P001',
          productName: 'Cat Food',
          unitPrice: 150,
          quantity: 2,
          productType: '',
          imageUrl: 'https://example.com/images/ao-thun.jpg'
        }
      ],
      shippingFee: 30000,
      totalAmount: 430000,
      orderStatus: 'Pending Confirmation',
      createdAt: '2025-09-25T03:30:00'
    }
  ];

  beforeEach(() => {
    http = jasmine.createSpyObj<HttpClient>('HttpClient', ['get', 'put', 'post', 'delete']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        { provide: HttpClient, useValue: http },
      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products', () => {
    http.get.and.returnValue(of(mockProducts));
    service.getAll().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    expect(http.get).toHaveBeenCalledWith(service['url']);
  });
  it('should fetch product by id', () => {
    http.get.and.returnValue(of(mockProducts[0]));
    service.getProductById(1).subscribe(product => {
      expect(product).toEqual(mockProducts[0]);
    });

    expect(http.get).toHaveBeenCalledWith(`${service['url']}/1`);
  });
  it('should fetch orders with params', () => {
    const params = new HttpParams().set('status', 'pending');
    http.get.and.returnValue(of(mockOrder));
    service.getOrder(params).subscribe(orders => {
      expect(orders).toEqual(mockOrder);
    });

    expect(http.get).toHaveBeenCalledWith(service['orderUrl'], { params });
  });
  it('should update product by id', () => {
    const updatedData = { name: 'Updated Product' };
    http.put.and.returnValue(of(mockProducts[0]));
    service.updateProduct(1, updatedData).subscribe(result => {
      expect(result).toEqual(mockProducts[0]);
    });

    expect(http.put).toHaveBeenCalledWith(`${service['url']}/1`, updatedData);
  });
  it('should create a new product', () => {
    http.post.and.returnValue(of(mockProduct));
    service.createProduct(mockProduct).subscribe(result => {
      expect(result).toEqual(mockProduct);
    });

    expect(http.post).toHaveBeenCalledWith(service['url'], mockProduct);
  });
  it('should delete product by id', () => {
    http.delete.and.returnValue(of(mockProduct));
    service.deleteProduct(3).subscribe(result => {
      expect(result).toEqual(mockProduct);
    });

    expect(http.delete).toHaveBeenCalledWith(`${service['url']}/3`);
  });

});
