import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGroup } from './radio-group';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('RadioGroup', () => {
  let component: RadioGroup;
  let fixture: ComponentFixture<RadioGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroup, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should integrate with FormControl via ControlValueAccessor', () => {
    const control = new FormControl('optionA');

    component.registerOnChange(control.setValue.bind(control));
    component.registerOnTouched(() => {});
    component.writeValue(control.value);

    expect(component.value).toBe('optionA');

    component.selectValue('optionB');
    expect(control.value).toBe('optionB');
  });

  it('should update internal value when writeValue is called', () => {
    component.writeValue('option1');
    expect(component['value']).toBe('option1');
  });

  it('should have default onChange and onTouched as functions', () => {
    expect(typeof component.onChange).toBe('function');
    expect(typeof component.onTouched).toBe('function');
  
    expect(() => component.onChange('test')).not.toThrow();
    expect(() => component.onTouched()).not.toThrow();
  });
  
  it('should store onChange callback when registerOnChange is called', () => {
    const fn = jasmine.createSpy('onChange');
    component.registerOnChange(fn);
  
    component['onChange']('option2');
    expect(fn).toHaveBeenCalledWith('option2');
  });
  it('should store onTouched callback when registerOnTouched is called', () => {
    const fn = jasmine.createSpy('onTouched');
    component.registerOnTouched(fn);
  
    component['onTouched']();
    expect(fn).toHaveBeenCalled();
  });
  
  it('should update value and call onChange and onTouched', () => {
    const changeSpy = jasmine.createSpy('onChange');
    const touchSpy = jasmine.createSpy('onTouched');
  
    component.onChange = changeSpy;
    component.onTouched = touchSpy;
  
    const mockValue = { id: 1, name: 'Option A' };
    component.selectValue(mockValue);
  
    expect(component.value).toEqual(mockValue);
    expect(changeSpy).toHaveBeenCalledWith(mockValue);
    expect(touchSpy).toHaveBeenCalled();
  });
  it('should emit priceChange if value has price', () => {
    spyOn(component.priceChange, 'emit');
    const mockValue = { id: 2, name: 'Option B', price: 150000 };
    component.selectValue(mockValue);
  
    expect(component.priceChange.emit).toHaveBeenCalledWith(150000);
  });
  
});
