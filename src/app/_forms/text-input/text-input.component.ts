import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements ControlValueAccessor {

  @Input() label :string = '';
  @Input() type : string = '';
  @Input() id : string = '';

  errorMessages: { [key: string]: string } = {
    required: '* {{label}} is required!',
    minlength: '* {{label}} must be at least {{requiredLength}} characters long.',
    pattern: '* Invalid {{label}} format.',
    emailPattern: '* Email must be a valid format (e.g., example@domain.com).',
    passwordPattern: '* Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.'
  };

  constructor(@Self() public ngControl: NgControl) {
    if (ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    if (this.ngControl.control?.value !== value) {
      this.ngControl.control?.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    // this.ngControl.control?.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   if (isDisabled) {
  //     this.ngControl.control?.disable();
  //   } else {
  //     this.ngControl.control?.enable();
  //   }
  // }

  onTouched: () => void = () => {};

  getErrorMessage(): string {
    if (this.ngControl.errors) {
      for (const errorName in this.ngControl.errors) {
        if (this.errorMessages[errorName]) {
          let message = this.errorMessages[errorName];
          if (errorName === 'minlength' || errorName === 'maxlength') {
            message = message.replace('{{requiredLength}}', this.ngControl.errors[errorName].requiredLength);
          }
          return message.replace('{{label}}', this.label);
        }
      }
      if (this.label === 'Email' && this.ngControl.errors['pattern']) {
        return this.errorMessages['emailPattern'];
      }
      if (this.label === 'Password' && this.ngControl.errors['pattern']) {
        return this.errorMessages['passwordPattern'];
      }
    }
    return '';
  }


}
