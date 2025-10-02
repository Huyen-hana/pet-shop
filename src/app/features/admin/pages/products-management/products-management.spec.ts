import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsManagement } from './products-management';
import { provideHttpClient } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogManager } from '../../../../shared/services/dialog-manager-service/dialog-manager';
import { Product } from '../../../../shared/models/product.model';
import { of } from 'rxjs';
import { ProductService } from '../../../../shared/services/product-service/product-service';

describe('ProductsManagement', () => {
  let component: ProductsManagement;
  let fixture: ComponentFixture<ProductsManagement>;
  let dialogManagerSpy: jasmine.SpyObj<DialogManager>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    dialogManagerSpy = jasmine.createSpyObj('DialogManager', ['open', 'openConfirm']);
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getAll']);

    await TestBed.configureTestingModule({
      imports: [ProductsManagement],
      providers: [
        provideHttpClient(),
        DialogService,
        ConfirmationService,
        { provide: DialogManager, useValue: dialogManagerSpy },
        { provide: ProductService, useValue: productServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsManagement);
    component = fixture.componentInstance;

    productServiceSpy.getAll.and.returnValue(of([
      { id: 1, name: 'Product A' },
      { id: 2, name: 'Product B' }
    ] as Product[]));
    spyOn(component.products, 'set');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProducts when result has id', () => {
    const mockProduct: Product = { id: 1, name: 'Test Product' } as Product;
    const mockResult = { id: 1 };
    spyOn(component, 'loadProducts');
    dialogManagerSpy.open.and.returnValue(of(mockResult));

    component.editProduct(mockProduct);

    expect(dialogManagerSpy.open).toHaveBeenCalledWith(jasmine.anything(), {
      header: 'Edit Product',
      data: mockProduct
    });
    expect(component.loadProducts).toHaveBeenCalled();
  });
  it('should not call loadProducts when result has no id', () => {
    const mockProduct: Product = { id: 1, name: 'Test Product' } as Product;
    const mockResult = {}; // no id
    spyOn(component, 'loadProducts');
    dialogManagerSpy.open.and.returnValue(of(mockResult));

    component.editProduct(mockProduct);

    expect(component.loadProducts).not.toHaveBeenCalled();
  });

  it('should call loadProducts when result is truthy', () => {
    const mockResult = { id: 123 };
    spyOn(component, 'loadProducts');
    dialogManagerSpy.open.and.returnValue(of(mockResult));
    component.addProduct();

    expect(dialogManagerSpy.open).toHaveBeenCalledWith(jasmine.anything(), {
      header: 'Create new product',
      data: jasmine.objectContaining({
        name: '',
        price: 0,
        variants: []
      })
    });
    expect(component.loadProducts).toHaveBeenCalled();
  });

  it('should confirm and proceed with deletion when confirmed is true', async () => {
    dialogManagerSpy.openConfirm.and.resolveTo(true);
    const consoleSpy = spyOn(console, 'log');
    await component.deleteProduct(123);

    expect(dialogManagerSpy.openConfirm).toHaveBeenCalledWith('Do you want to delete this product?');
    expect(consoleSpy).toHaveBeenCalledWith('Delete');
  });
  it('should not proceed with deletion when confirmed is false', async () => {
    dialogManagerSpy.openConfirm.and.resolveTo(false);
    const consoleSpy = spyOn(console, 'log');
    await component.deleteProduct(123);

    expect(dialogManagerSpy.openConfirm).toHaveBeenCalled();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  describe('getSevere', () => {
    it('should return "success" when stock is greater than 0', () => {
      expect(component.getSevere(10)).toBe('success');
      expect(component.getSevere(1)).toBe('success');
    });

    it('should return "warn" when stock is 0', () => {
      expect(component.getSevere(0)).toBe('warn');
    });

    it('should return "warn" when stock is negative', () => {
      expect(component.getSevere(-5)).toBe('warn');
    });
  });

  it('should call productService.getAll and update products', () => {
    expect(productServiceSpy.getAll).toHaveBeenCalled();
    expect(component.products.set).toHaveBeenCalledWith([
      { id: 1, name: 'Product A' },
      { id: 2, name: 'Product B' }
    ] as Product[]);
  });

  describe('getColumnWidth', () => {
    it('should return "auto" for known fields', () => {
      expect(component.getColumnWidth('id')).toBe('auto');
      expect(component.getColumnWidth('name')).toBe('auto');
      expect(component.getColumnWidth('price')).toBe('auto');
      expect(component.getColumnWidth('category')).toBe('auto');
      expect(component.getColumnWidth('currentStock')).toBe('auto');
      expect(component.getColumnWidth('button')).toBe('auto');
    });

    it('should return "5%" for empty string field', () => {
      expect(component.getColumnWidth('')).toBe('5%');
    });

    it('should return "auto" for unknown fields', () => {
      expect(component.getColumnWidth('unknown')).toBe('auto');
      expect(component.getColumnWidth('brand')).toBe('auto');
    });
  });

});
