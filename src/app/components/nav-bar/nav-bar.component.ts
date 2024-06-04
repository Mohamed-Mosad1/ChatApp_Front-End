import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/models/auth';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  loginForm!: FormGroup;
  loggedIn: boolean = false;

  constructor(
    public _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this._authService.login(this.loginForm.value).subscribe({
      next: (res: IUser) => {
        this.loggedIn = true;
        this._router.navigate(['/member']);
        console.log(res);
        this._toastrService.success('Logged in successfully');
      },
      error: (err) => {
        console.log(err);
        this._toastrService.error(`${err.error?.status} - ${err.error?.title}`);
      },
    });
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/']);
    this.loggedIn = false;
    this._toastrService.warning('Logged out successfully');
  }
}
