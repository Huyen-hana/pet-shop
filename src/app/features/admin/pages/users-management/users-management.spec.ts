import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagement } from './users-management';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from '../../../../shared/services/user-service/user-service';
import { User } from '../../../../shared/models/user.model';
import { of, throwError } from 'rxjs';
import { Order } from '../../../../shared/models/order.model';
import { ProductService } from '../../../../shared/services/product-service/product-service';

describe('UsersManagement', () => {
  let component: UsersManagement;
  let fixture: ComponentFixture<UsersManagement>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let mockUsers: User[] = [];
  let mockOrders: Order[] = [];

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getAllUser']);
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getOrder']);
    await TestBed.configureTestingModule({
      imports: [UsersManagement],
      providers: [
        provideHttpClient(),
        { provide: UserService, useValue: userServiceSpy },
        { provide: ProductService, useValue: productServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersManagement);
    component = fixture.componentInstance;

    mockUsers = [
      { id: '1', fullName: 'User A' },
      { id: '2', fullName: 'User B' }
    ] as User[];
    mockOrders = [
      { name: 'A', cart: [{productId: '2'}] },
      { name: 'B', cart: [{productId: '6'}] }
    ] as Order[];

    userServiceSpy.getAllUser.and.returnValue(of(mockUsers));
    productServiceSpy.getOrder.and.returnValue(of(mockOrders));
    spyOn(component.users, 'set');
    spyOn(component.orders, 'set');
    fixture.detectChanges();
  });

  afterEach(() => {
    component.users.set([]);
    component.orders.set([]);
  });  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService.getAllUser and update users', () => {
    expect(userServiceSpy.getAllUser).toHaveBeenCalled();
    expect(component.users.set).toHaveBeenCalledWith([...mockUsers]);
  });
  it('should log error when userService.getAllUser fails', () => {
    const error = new Error('Failed to fetch users');
    userServiceSpy.getAllUser.and.returnValue(throwError(() => error));
    const consoleSpy = spyOn(console, 'log');
    component.renderUsers();

    expect(userServiceSpy.getAllUser).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });

  it('should call productService.getOrder and update orders', () => {
    expect(productServiceSpy.getOrder).toHaveBeenCalled();
    expect(component.orders.set).toHaveBeenCalledWith([...mockOrders]);
  });
  it('should log error when productService.getOrder fails', () => {
    const error = new Error('Failed to fetch orders');
    productServiceSpy.getOrder.and.returnValue(throwError(() => error));
    const consoleSpy = spyOn(console, 'error');
    component.renderOrders();

    expect(productServiceSpy.getOrder).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(error);
  });

  describe('getSevere', () => {
    it('should return correct severity for known statuses', () => {
      expect(component.getSevere('Pending Confirmation')).toBe('secondary');
      expect(component.getSevere('Confirmed')).toBe('contrast');
      expect(component.getSevere('Preparing Items')).toBe('warning');
      expect(component.getSevere('Shipping')).toBe('info');
      expect(component.getSevere('Delivered')).toBe('success');
      expect(component.getSevere('Cancelled')).toBe('danger');
    });

    it('should return "secondary" for unknown status', () => {
      expect(component.getSevere('Unknown')).toBe('secondary');
      expect(component.getSevere('')).toBe('secondary');
      expect(component.getSevere('Returned')).toBe('secondary');
    });
  });

  describe('getStatus', () => {
    it('should return correct label for known statuses', () => {
      expect(component.getStatus('Pending Confirmation')).toBe('Pending');
      expect(component.getStatus('Confirmed')).toBe('Confirmed');
      expect(component.getStatus('Preparing Items')).toBe('Preparing');
      expect(component.getStatus('Shipping')).toBe('Shipping');
      expect(component.getStatus('Delivered')).toBe('Delivered');
      expect(component.getStatus('Cancelled')).toBe('Cancelled');
    });
  
    it('should return "Pending" for unknown status', () => {
      expect(component.getStatus('Unknown')).toBe('Pending');
      expect(component.getStatus('')).toBe('Pending');
      expect(component.getStatus('Returned')).toBe('Pending');
    });
  });
  
});
