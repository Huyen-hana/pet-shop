import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditForm } from './product-edit-form';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { customMessageService } from '../../../../services/message-service/message-service';
import { of, throwError } from 'rxjs';
import { ProductService } from '../../../../services/product-service/product-service';

describe('ProductEditForm', () => {
  let component: ProductEditForm;
  let fixture: ComponentFixture<ProductEditForm>;
  let productServiceSpy: any;
  let messageServiceSpy: any;
  let refSpy: any;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['updateProduct', 'createProduct']);
    messageServiceSpy = jasmine.createSpyObj('customMessageService', ['showSuccess', 'showError']);
    refSpy = jasmine.createSpyObj('DynamicDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ProductEditForm],
      providers: [
        MessageService,
        DynamicDialogRef,
        { 
          provide: DynamicDialogConfig, 
          useValue: { data: { category: 'mock-category' } } 
        },
        provideHttpClient(),
        FormBuilder,
        { provide: customMessageService, useValue: messageServiceSpy },
        { provide: DynamicDialogRef, useValue: refSpy },
        { provide: DynamicDialogConfig, useValue: { data: { product: { id: 1 }, category: 'test' } } },
        { provide: ProductService, useValue: productServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEditForm);  
    component = fixture.componentInstance;
    component.product = 
    {
      id: 1,
      name: 'Test Product',
      type: 'dog',
      brand: 'TestBrand',
      price: 100,
      currentStock: 50,
      variants: []    
    };
    component.categories = [
      { name: 'Thức ăn cho mèo', key: 'A' },
      { name: 'Thức ăn cho chó', key: 'B' }
    ];
    component.typeCate = [
      { name: 'cat', key: 'cat' },
      { name: 'dog', key: 'dog' }
    ];  
    component.isEditMode = true;
    component.ngOnInit();
    const selectedType = component.typeCate.find(t => t.name === component.product.type);
    const selectedCategory = component.categories.find(c => c.name === 'Thức ăn cho chó');

    component.editForm.setValue({
      name: component.product.name,
      img: '',
      brand: component.product.brand,
      type: selectedType,
      category: selectedCategory,
      price: component.product.price,
      currentStock: component.product.currentStock
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call updateProduct and show success message when editing', () => {
    const mockResponse = { id: 1 };
    productServiceSpy.updateProduct.and.returnValue(of(mockResponse));
    component.onSubmitForm(new Event('submit'));

    expect(productServiceSpy.updateProduct).toHaveBeenCalledWith(1, jasmine.any(Object));
    expect(refSpy.close).toHaveBeenCalledWith(mockResponse);
    expect(messageServiceSpy.showSuccess).toHaveBeenCalledWith(
      'Success',
      'Product information updated successfully'
    );
  });
  
  it('should show error message when updateProduct fails', () => {
    const mockError = { message: 'Lỗi server' };
    productServiceSpy.updateProduct.and.returnValue(throwError(() => mockError));
    component.onSubmitForm(new Event('submit'));

    expect(messageServiceSpy.showError).toHaveBeenCalledWith(
      'Unable to update product',
      'Lỗi server'
    );
  });
  
  it('should call createProduct and show success message when creating', () => {
    component.isEditMode = false;
    const mockResponse = { id: 99 };
    productServiceSpy.createProduct.and.returnValue(of(mockResponse));
    component.onSubmitForm(new Event('submit'));
  
    expect(productServiceSpy.createProduct).toHaveBeenCalledWith(jasmine.any(Object));
    expect(refSpy.close).toHaveBeenCalledWith(mockResponse);
    expect(messageServiceSpy.showSuccess).toHaveBeenCalledWith(
      'Success',
      'The product has been newly created'
    );
  });
  
  it('should show error message when createProduct fails', () => {
    component.isEditMode = false;
    const mockError = { message: 'Tạo sản phẩm thất bại' };
    productServiceSpy.createProduct.and.returnValue(throwError(() => mockError));
  
    component.onSubmitForm(new Event('submit'));
  
    expect(productServiceSpy.createProduct).toHaveBeenCalledWith(jasmine.any(Object));
    expect(messageServiceSpy.showError).toHaveBeenCalledWith(
      'Unable to create product',
      'Tạo sản phẩm thất bại'
    );
  });
});
