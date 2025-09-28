import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutLayout } from './checkout-layout';
import { provideRouter } from '@angular/router';

describe('CheckoutLayout', () => {
  let component: CheckoutLayout;
  let fixture: ComponentFixture<CheckoutLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutLayout],
      providers: [
        provideRouter([])
      ]
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
