import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorValidate } from './error-validate';

describe('ErrorValidate', () => {
  let component: ErrorValidate;
  let fixture: ComponentFixture<ErrorValidate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorValidate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorValidate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
