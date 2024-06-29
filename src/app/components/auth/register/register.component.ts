import { DateInputComponent } from 'src/app/_forms/date-input/date-input.component';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { matchValues } from 'src/app/models/password.validator';
import { TextInputComponent } from 'src/app/_forms/text-input/text-input.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DateInputComponent,
    TextInputComponent
  ],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  maxDate: Date = new Date();

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  private initializeForm() {
    this.registerForm = this._formBuilder.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      gender: ['Male'],
      knownAs: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      dateOfBirth: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.maxLength(20)]],
      country: ['', [Validators.required, Validators.maxLength(20)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required, matchValues('password')]],
    });

    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this._toastrService.error('Please fill out the form correctly.');
      return;
    }

    this._authService.register(this.registerForm.value).subscribe({
      next: () => {
        this._toastrService.success('Registered successfully');
        this._router.navigate(['/members']);
      },
      error: (err: HttpErrorResponse) => {
        this.handleErrorResponse(err);
      },
    });
  }

  private handleErrorResponse(err: HttpErrorResponse): void {
    if (err.error && err.error.errors && Array.isArray(err.error.errors)) {
      err.error.errors.forEach((error: string) => {
        this._toastrService.error(error);
      });
    } else if (err.error && err.error.message) {
      this._toastrService.error(err.error.message);
    } else {
      this._toastrService.error('An unexpected error occurred');
    }
  }
}
