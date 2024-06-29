import { CommonModule } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = '';
  hide = true;

  errorMessages: { [key: string]: string } = {
    required: '* {{label}} is required!',
    minlength:
      '* {{label}} must be at least {{requiredLength}} characters long.',
    maxlength:
      "* {{label}} can't be longer than {{requiredLength}} characters.",
    emailPattern: '* Email must be a valid format (e.g., example@domain.com).',
    passwordPattern:
      '* Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
    isMatching: '* Password Not Matched',
  };

  constructor(@Self() public ngControl: NgControl) {
    if (ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    const control = this.ngControl.control;
    if (control) {
      control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onTouched: () => void = () => {};

  getErrorMessage(): string {
    if (this.ngControl.errors) {
      for (const errorName in this.ngControl.errors) {
        if (this.errorMessages[errorName]) {
          let message = this.errorMessages[errorName];
          if (errorName === 'minlength' || errorName === 'maxlength') {
            message = message.replace(
              '{{requiredLength}}',
              this.ngControl.errors[errorName].requiredLength
            );
          }
          return message.replace('{{label}}', this.label);
        }
      }
      if (this.label === 'Email' && this.ngControl.errors['pattern']) {
        return this.errorMessages['emailPattern'];
      }
      if (
        (this.label === 'Password' || this.label === 'New Password') &&
        this.ngControl.errors['pattern']
      ) {
        return this.errorMessages['passwordPattern'];
      }
    }
    return '';
  }
}
