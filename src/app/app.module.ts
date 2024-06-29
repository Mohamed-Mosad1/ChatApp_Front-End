import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { SharedModule } from './modules/shared.module';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { HasRoleDirective } from './_directive/has-role.directive';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    // MemberListComponent,
    // MemberDetailsComponent,
    // ListsComponent,
    // MessagesComponent,
    // NotFoundComponent,
    // MemberCardComponent,
    // MemberEditComponent,
    // PhotoEditorComponent,
    // TextInputComponent,
    // MemberMessageComponent,
    // AdminPanelComponent,
    NavBarComponent,
    // AdminManagementComponent,
    // RolesModalsComponent,
    // ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HasRoleDirective,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
