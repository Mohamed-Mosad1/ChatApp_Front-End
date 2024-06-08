import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();
  registerForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.registerForm = this._formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this._toastrService.error('Please fill out the form correctly.');
      return;
    }

    this._authService.register(this.registerForm.value).subscribe({
      next: (user) => {
        console.log(user);
        this._toastrService.success('Registered successfully');
        this.cancel();
        this._router.navigate(['/member']);
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

  cancel() {
    this.cancelRegister.emit(false);
  }
}
