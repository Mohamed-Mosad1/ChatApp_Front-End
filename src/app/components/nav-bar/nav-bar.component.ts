import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  loginForm!: FormGroup;
  loggedIn = false;
  baseServerUrl: string = environment.baseServerUrl;

  constructor(
    public _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
    this.loggedIn = !this._authService.currentUser$;
  }

  private initializeLoginForm() {
    this.loginForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this._toastrService.error('Please fill out the form correctly.');
      return;
    }

    this._authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loggedIn = true;
        this._router.navigate(['/members']);
        this._toastrService.success('Logged in successfully');
      },
      error: (err) => {
        const errorMessage = this.extractErrorMessage(err);
        this._toastrService.error(errorMessage);
        console.error(err);
      },
    });
  }

  private extractErrorMessage(err: any): string {
    if (err.error && err.error.status && err.error.title) {
      return `${err.error.status} - ${err.error.title}`;
    }
    return 'An unexpected error occurred';
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/']);
    this.loggedIn = false;
    this._toastrService.warning('Logged out successfully');
  }
}
