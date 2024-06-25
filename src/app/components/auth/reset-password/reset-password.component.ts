import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { IResetPassword } from 'src/app/models/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
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
      let urlToken = params['code'];
      this.emailToken = urlToken ? urlToken.replace(/ /g, "+") : '';
      if (!this.emailToReset || !this.emailToken) {
        this._toastrService.error('Invalid reset link', 'Error');
        this._router.navigate(['/login']);
      }
      console.log(this.emailToReset, this.emailToken);
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
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('newPassword')],
      ],
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const matchingControl = control?.parent?.get(matchTo);
      return control?.value === matchingControl?.value
        ? null
        : { isMatching: true };
    };
  }

  OnSubmitResetForm() {
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj = {
        email: this.emailToReset,
        newPassword: this.resetPasswordForm.value.newPassword,
        confirmPassword: this.resetPasswordForm.value.confirmPassword,
        emailToken: this.emailToken
      };

      this._authService.resetPassword(this.resetPasswordObj).subscribe({
        next: (res) => {
          console.log(res);
          this.resetPasswordForm.reset();
          this._router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
        },
      });

      return;
    }else{

      return;
    }
  }
}
