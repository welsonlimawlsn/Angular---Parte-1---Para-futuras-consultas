import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {RadioOption} from './radio-option.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input()
  options: RadioOption[];

  value: any;

  onChange: any;

  constructor() {
  }

  ngOnInit() {
  }

  setValue(option: any) {
    this.value = option;
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

}
