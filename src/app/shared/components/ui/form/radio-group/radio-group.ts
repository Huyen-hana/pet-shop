import { Component, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-group',
  imports: [RadioButtonModule, AccordionModule, CommonModule],
  templateUrl: './radio-group.html',
  styleUrl: './radio-group.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroup),
      multi: true
    }
  ]
})
export class RadioGroup implements ControlValueAccessor {
  value: any;
  onChange = (_: any) => {};
  onTouched = () => {};

  @Input() name: string = '';
  @Input() groupName: string = '';
  @Input() categories: any[] = [];

  @Output() priceChange = new EventEmitter<number>();

  writeValue(value: any): void {
    this.value = value;
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  };

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  };

  selectValue(value: any): void {
    this.value = value;
    this.onChange(value);
    this.priceChange.emit(value.price)
  };

}
