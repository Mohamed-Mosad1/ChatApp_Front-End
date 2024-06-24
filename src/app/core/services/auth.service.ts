import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { ILogin, IUser } from '../../models/auth';
import { ReplaySubject, catchError, map, take, throwError } from 'rxjs';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.baseUrl;
  private currentUserSource = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private _httpClient: HttpClient, private _presenceService: PresenceService) {}

  login(model: ILogin) {
    return this._httpClient
      .post<IUser>(`${this.baseUrl}Accounts/Login`, model)
      .pipe(
        map((user) => {
          if (user) {
            this.setCurrentUser(user);
            this._presenceService.createHubConnection(user);
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
            this._presenceService.createHubConnection(user);
          }
        }),
        catchError((error) => this.handleError('Registration failed', error))
      );
  }

  setCurrentUser(user: IUser) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    // Stop the Hub connection
    this._presenceService.stopHubConnection();
  }




  private handleError(message: string, error: any) {
    console.error(message, error);
    return throwError(() => new Error(`${message}, please try again.`));
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

}
