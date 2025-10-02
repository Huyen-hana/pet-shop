import { TestBed } from '@angular/core/testing';

import { UserService } from './user-service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { User } from '../../models/user.model';
import { of, throwError } from 'rxjs';
import { Order } from '../../models/order.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const mockUsers: User[] = [
    {
      id: 1,
      fullName: 'Huyen Nguyen',
      email: 'huyen1@example.com',
      passWord: '123456',
      role: 'admin',
      avatar: 'ava1.png',
      phone: '0123456789',
      createdAt: '2025-09-01'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all users via GET', () => {
    service.getAllUser().subscribe(users => {
      expect(users.length).toBe(1);
      expect(users).toEqual(mockUsers);
    });
    const req = httpMock.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch user by ID via GET', () => {
    const userId = 1;
    const expectedUser = mockUsers[0];

    service['getUserById'](userId).subscribe(user => {
      expect(user).toEqual(expectedUser);
    });
    const req = httpMock.expectOne(`${service['url']}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedUser);
  });

  it('should handle error when getAllUser fails', () => {
    service.getAllUser().subscribe({
      next: () => fail('Expected error, but got success'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });
    const req = httpMock.expectOne(service['url']);
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });
  it('should handle error when getUserById fails', () => {
    const userId = 999;
    service['getUserById'](userId).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    });
    const req = httpMock.expectOne(`${service['url']}/${userId}`);
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });

  it('should return user when email matches', () => {
    const email = 'huyen1@example.com';
    service['getUserByEmail'](email).subscribe(user => {
      expect(user).toEqual(mockUsers[0]);
    });
    const req = httpMock.expectOne(
      r => r.url === service['url'] && r.params.get('email') === email
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockUsers[0]]);
  });
  it('should return null when no user matches email', () => {
    const email = 'unknown@example.com';
    service['getUserByEmail'](email).subscribe(user => {
      expect(user).toBeNull();
    });
    const req = httpMock.expectOne(
      r => r.url === service['url'] && r.params.get('email') === email
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
  it('should return null when server responds with 404', () => {
    const email = 'notfound@example.com';
    service['getUserByEmail'](email).subscribe(user => {
      expect(user).toBeNull();
    });
    const req = httpMock.expectOne(
      r => r.url === service['url'] && r.params.get('email') === email
    );
    expect(req.request.method).toBe('GET');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });
  it('should throw error when server responds with 500', () => {
    const email = 'error@example.com';
    service['getUserByEmail'](email).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    });
    const req = httpMock.expectOne(
      r => r.url === service['url'] && r.params.get('email') === email
    );
    expect(req.request.method).toBe('GET');
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should create a new user and return the created user', () => {
    const newUser: User = {
      id: 3,
      fullName: 'Lan Pham',
      email: 'lan@example.com',
      passWord: 'pass123',
      role: 'customer',
      avatar: 'ava3.png',
      phone: '0111222333',
      createdAt: '2025-09-20'
    };
    service.createUser(newUser).subscribe((response) => {
      expect(response).toEqual(newUser);
    });
  
    const req = httpMock.expectOne(service['url']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(newUser);
  });

  it('should return null if email or password is missing', () => {
    service.checkHaveUser(undefined, 'test@example.com').subscribe(result => {
      expect(result).toBeNull();
    });
    service.checkHaveUser('123456', undefined).subscribe(result => {
      expect(result).toBeNull();
    });
  });
  it('should return user info if email and password match', () => {
    const email = 'huyen1@example.com';
    const passWord = '123456';
    const expectedUser = mockUsers[0];

    spyOn(service, 'getUserByEmail').and.returnValue(of(expectedUser));

    service.checkHaveUser(passWord, email).subscribe(result => {
      expect(result).toEqual({
        fullName: expectedUser.fullName,
        avatar: expectedUser.avatar,
        role: expectedUser.role
      });
    });
  });
  it('should return null if password does not match', () => {
    const email = 'huyen1@example.com';
    const wrongPassword = 'wrongpass';
    const expectedUser = mockUsers[0];
    spyOn(service, 'getUserByEmail').and.returnValue(of(expectedUser));
    service.checkHaveUser(wrongPassword, email).subscribe(result => {
      expect(result).toBeNull();
    });
  });
  it('should return null if getUserByEmail returns null', () => {
    const email = 'notfound@example.com';
    const passWord = '123456';
    spyOn(service, 'getUserByEmail').and.returnValue(of(null));
    service.checkHaveUser(passWord, email).subscribe(result => {
      expect(result).toBeNull();
    });
  });
  it('should return null if getUserByEmail throws error', () => {
    const email = 'error@example.com';
    const passWord = '123456';

    spyOn(service, 'getUserByEmail').and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 500 }))
    );
    service.checkHaveUser(passWord, email).subscribe(result => {
      expect(result).toBeNull();
    });
  });


  it('should return false if email is undefined', () => {
    service.checkUserByEmail(undefined).subscribe(result => {
      expect(result).toBeFalse();
    });
  });
  it('should throw error for non-404 errors', () => {
    const email = 'error@example.com';
    const errorResponse = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });

    spyOn(service, 'getUserByEmail').and.returnValue(throwError(() => errorResponse));
    service.checkUserByEmail(email).subscribe({
      next: () => fail('Expected error to be thrown'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });
  });
  it('should return false if server returns 404 error', () => {
    const email = 'missing@example.com';
    spyOn(service, 'getUserByEmail').and.returnValue(
      throwError(() => new HttpErrorResponse({ status: 404 }))
    );
    service.checkUserByEmail(email).subscribe(result => {
      expect(result).toBeFalse();
    });
  });

  it('should create order and return it', () => {
    const order: Order = {
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
    };
    service.createOrder(order).subscribe(res => {
      expect(res).toEqual(order);
    });
  
    const req = httpMock.expectOne(service['orderUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(order);
    req.flush(order);
  });

});
