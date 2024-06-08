import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { ILogin, IUser } from '../../models/auth';
import { ReplaySubject, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.baseUrl;
  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private _httpClient: HttpClient) {}

  login(model: ILogin) {
    return this._httpClient
      .post<IUser>(`${this.baseUrl}Accounts/Login`, model)
      .pipe(
        map((user) => {
          if (user) {
            this.setCurrentUser(user);
          }
        }),
        catchError((error) => this.handleError('Login failed', error))
      );
  }


  register(model: IUser) {
    return this._httpClient
      .post<IUser>(`${this.baseUrl}Accounts/Register`, model)
      .pipe(
        map((user) => {
          if (user) {
            this.setCurrentUser(user);
          }
        }),
        catchError((error) => this.handleError('Registration failed', error))
      );
  }

  setCurrentUser(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  private handleError(message: string, error: any) {
    console.error(message, error);
    return throwError(() => new Error(`${message}, please try again.`));
  }

}
