import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutLayout } from './checkout-layout';

describe('CheckoutLayout', () => {
  let component: CheckoutLayout;
  let fixture: ComponentFixture<CheckoutLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
