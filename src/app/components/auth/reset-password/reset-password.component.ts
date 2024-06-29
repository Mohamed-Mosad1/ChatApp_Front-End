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
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ToastrService } from 'ngx-toastr';
import { TextInputComponent } from 'src/app/_forms/text-input/text-input.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { IResetPassword } from 'src/app/models/auth';
import { matchValues } from 'src/app/models/password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonsModule,
    TextInputComponent,
    ReactiveFormsModule
  ],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  emailToReset: string = '';
  emailToken: string = '';
  resetPasswordObj!: IResetPassword;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this._activatedRoute.queryParams.subscribe((params) => {
      this.emailToReset = params['email'];
      let urlToken = params['token'];
      this.emailToken = urlToken ? urlToken.replace(/ /g, '+') : '';
      if (!this.emailToReset || !this.emailToken) {
        this._toastrService.error('Invalid reset link', 'Error');
        this._router.navigate(['/login']);
      }
    });
  }

  initializeForm() {
    this.resetPasswordForm = this._formBuilder.group({
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required, matchValues('newPassword')]],
    });

    this.resetPasswordForm.get('password')?.valueChanges.subscribe(() => {
      this.resetPasswordForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  OnSubmitResetForm() {
    if (this.resetPasswordForm.invalid) {
      this._toastrService.error('Please fill out the form correctly.');
    }

    this.resetPasswordObj = {
      email: this.emailToReset,
      newPassword: this.resetPasswordForm.value.newPassword,
      confirmPassword: this.resetPasswordForm.value.confirmPassword,
      emailToken: this.emailToken,
    };

    this._authService.resetPassword(this.resetPasswordObj).subscribe({
      next: (res) => {
        this._toastrService.success('Password Reset Successful');
        this._router.navigate(['/login']);
      },
      error: (err) => {
        this.handleErrorResponse(err);
      },
    });
  }

  private handleErrorResponse(err: HttpErrorResponse): void {
    if (err.error && err.error.errors && Array.isArray(err.error.errors)) {
      err.error.errors.forEach((error: string) => {
        this._toastrService.error(error);
      });
    } else {
      this._toastrService.error(
        err.status !== 200 && err.status === 400
          ? err.error
          : 'An unexpected error occurred'
      );
    }
  }
}
