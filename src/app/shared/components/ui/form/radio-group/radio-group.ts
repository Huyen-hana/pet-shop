import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-group',
  imports: [RadioButtonModule, AccordionModule, CommonModule, FormsModule],
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

  writeValue(value: string | null): void {
    this.value = value;
  };

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  };

  registerOnTouched(fn: ()=> void): void {
    this.onTouched = fn;
  };

  selectValue(value: any): void {
    this.value = value
    this.onChange(this.value);
    this.onTouched();
    if (value.price) {
      this.priceChange.emit(value.price)
    };
  };

}
