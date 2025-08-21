import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyCart } from './empty-cart';

describe('EmptyCart', () => {
  let component: EmptyCart;
  let fixture: ComponentFixture<EmptyCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyCart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
