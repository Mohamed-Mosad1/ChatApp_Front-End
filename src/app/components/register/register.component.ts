import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
  registerForm: FormGroup = new FormGroup({});
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
      userName: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['male'],
      knownAs: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      dateOfBirth: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const matchingControl = control?.parent?.get(matchTo);
      return control?.value === matchingControl?.value ? null : { isMatching: true };
    };
  }

  register() {
    if (this.registerForm.invalid) {
      this._toastrService.error('Please fill out the form correctly.');
      return;
    }

    this._authService.register(this.registerForm.value).subscribe({
      next: (user) => {
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
