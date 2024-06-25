import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  modalRef?: BsModalRef;
  isValidEmail: boolean = false;
  resetPasswordEmail: string = '';


  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toastrService: ToastrService,
    private modalService: BsModalService,
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this._formBuilder.group({
      userNameOrEmail: ['', [Validators.required, Validators.minLength(3)]],
      password: [ '', [ Validators.required, Validators.pattern( '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$' ) ] ]
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
        this._router.navigate(['/members']);
      },
      error: (err) => {
        this.handleErrorResponse(err);
        console.log(err);

      },
    });
  }

  checkValidEmail(event: string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.isValidEmail = emailPattern.test(event);
    return this.isValidEmail;
  }


  confirmToSendEmail(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      this._authService.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
        next: (res) => {
          this.resetPasswordEmail = '';
          this.modalRef?.hide();
          this._toastrService.success(`${res}`);
        },
        error: (err) => {
          this.handleErrorResponse(err);
        },
      })
    }
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }

  private handleErrorResponse(err: HttpErrorResponse): void {
    if (err.error && err.error.errors && Array.isArray(err.error.errors)) {
      err.error.errors.forEach((error: string) => {
        this._toastrService.error(error);
      });
    } else {
      this._toastrService.error(err.status !== 200 ? 'Invalid Email or Password' : 'An unexpected error occurred');
    }
  }
}
