import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditForm } from './product-edit-form';

describe('ProductEditForm', () => {
  let component: ProductEditForm;
  let fixture: ComponentFixture<ProductEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
