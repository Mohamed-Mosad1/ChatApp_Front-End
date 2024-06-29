import { CommonModule } from '@angular/common';
import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ],
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() maxDate: Date = new Date();
  required: string = '* Age Must be Greater than 18!';

  constructor(@Self() public ngControl: NgControl) {
    if (ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  getErrorMessage(): string {
    if (this.ngControl.errors) {
      if (this.ngControl.errors['required']) {
        return this.required;
      }
    }
    return '';
  }
}
