
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorValidate } from './error-validate';
import { MessageModule } from 'primeng/message';
import { FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('ErrorValidate', () => {
  let component: ErrorValidate;
  let fixture: ComponentFixture<ErrorValidate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageModule, CommonModule, ErrorValidate]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorValidate);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return required error message when control is dirty or touched', () => {
    const control = new FormControl('', [Validators.required]);
    control.markAsTouched(); // Simulate user touching the field
    control.updateValueAndValidity();

    component.control = control;
    component.nameControl = 'Email';

    expect(component.message).toBe('Email is a required field');
  });

  it('should return minlength error message', () => {
    const control = new FormControl('a', [Validators.minLength(5)]);
    control.markAsDirty(); // Simulate user editing the field
    control.updateValueAndValidity();

    component.control = control;
    component.nameControl = 'Username';

    expect(component.message).toBe('Please enter at least 5 characters');
  });

  it('should return pattern error message', () => {
    const control = new FormControl('abc', [Validators.pattern(/^[0-9]+$/)]);
    control.markAsTouched();
    control.updateValueAndValidity();

    component.control = control;
    component.nameControl = 'Phone';

    expect(component.message).toBe('Phone must be valid');
  });

  it('should return null if control is not dirty or touched', () => {
    const control = new FormControl('', [Validators.required]);
    control.updateValueAndValidity(); // Not dirty or touched

    component.control = control;
    component.nameControl = 'Test';

    expect(component.message).toBeNull();
  });

  it('should return undefined if error key not in predefined messages', () => {
    const control = new FormControl('', [() => ({ customError: true })]);
    control.markAsDirty();
    control.updateValueAndValidity();

    component.control = control;
    component.nameControl = 'Custom Field';

    const key = Object.keys(control.errors!)[0];
    const value = control.errors![key];

    expect(component.getErrMess(key, value)).toBeUndefined();
  });
});

