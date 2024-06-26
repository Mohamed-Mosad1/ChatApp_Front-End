import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl: string = environment.baseUrl;

  constructor(private _httpClient: HttpClient) {}

  getUsersWithRoles() {
    return this._httpClient.get<Partial<IUser[]>>(
      this.baseUrl + 'Admin/get-users-with-roles'
    );
  }

  updateUsersRoles(userName: string, roles: string[]) {
    return this._httpClient.post(
      `${this.baseUrl}Admin/update-roles/${userName}?roles=${roles}`,
      {}
    );
  }
}
