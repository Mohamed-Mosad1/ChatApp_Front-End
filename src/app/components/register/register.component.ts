import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  registerForm: FormGroup = new FormGroup({});

  constructor(
    public _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router:Router,
    private _toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  register() {
    this._authService.register(this.registerForm.value).subscribe({
      next: (res:IUser) => {
        console.log(res);
        this._toastrService.success('Registered successfully');
        this.cancel();
        this._router.navigate(['/member']);
      },
      error: (err) => {
        if (err.error && Array.isArray(err.error) && err.error.length > 0) {
          this._toastrService.error(err.error[0]);
        } else {
          this._toastrService.error('An unexpected error occurred');
        }
        console.log(err?.error[0]);
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
