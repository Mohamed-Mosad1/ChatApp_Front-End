import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { IUpdateMember, Member } from '../../models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.baseUrl;

  constructor(private _httpClient: HttpClient) {}

  getMembers() {
    return this._httpClient.get<Member[]>(this.baseUrl + 'Accounts/get-all-users');
  }

  getMemberByUserName(userName: string) {
    return this._httpClient.get<Member>(this.baseUrl + 'Accounts/get-user-by-userName/' + userName);
  }

  updateMember(model: IUpdateMember) {
    return this._httpClient.put(this.baseUrl + 'Accounts/update-current-member', model);
  }

}
