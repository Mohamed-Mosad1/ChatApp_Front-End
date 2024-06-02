import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { ILogin, IUser } from '../models/auth';
import { ReplaySubject, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;
  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private _httpClient: HttpClient) { }

  login(model: ILogin) {
    return this._httpClient.post<IUser>(this.baseUrl +'Accounts/Login', model).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => new Error('Login failed, please try again.'));
      })
    );
  }

  register(model: IUser) {
    return this._httpClient.post<IUser>(this.baseUrl + 'Accounts/Register', model)
    .pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      }),
      catchError((error) => {
        console.error('Registration failed', error);
        return throwError(() => new Error('Registration failed, please try again.'));
      })
    );
  }

  setCurrentUser(user: IUser) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
