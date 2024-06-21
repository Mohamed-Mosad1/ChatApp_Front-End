import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this._formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this._toastrService.error('Please fill out the form correctly.');
      return;
    }

    this._authService.login(this.loginForm.value).subscribe({
      next: (user) => {
        this._toastrService.success('Logged in successfully');
        this._router.navigate(['/members']); // Navigate to member page or desired route after login
      },
      error: (err) => {
        const errorMessage = this.extractErrorMessage(err);
        this._toastrService.error(errorMessage);
        console.error(err);
      },
    });
  }

  private extractErrorMessage(err: any): string {
    if (err.error && Array.isArray(err.error) && err.error.length > 0) {
      return err.error[0];
    }
    return 'An unexpected error occurred';
  }


}
