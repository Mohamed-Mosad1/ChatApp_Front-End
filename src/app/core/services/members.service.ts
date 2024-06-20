import { UserParams } from './../../models/UserParams';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { IUpdateMember, Member, Photo } from '../../models/member';
import { Observable, map, of, take } from 'rxjs';
import { AuthService } from './auth.service';
import { IUser } from 'src/app/models/auth';
import { getPaginatedResult, getPaginationHeaders } from './PaginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MembersService {

  baseUrl = environment.baseUrl;
  memberCaching = new Map();

  user!: IUser;
  userParams!: UserParams;

  constructor(private _httpClient: HttpClient, private _authService: AuthService) {
    _authService.currentUser$.pipe(take(1)).subscribe({
      next: (res) => {
        if (res) {
          this.user = res;
          this.userParams = new UserParams();
        }
      },
    })
  }

  addLike(userName: string): Observable<any> {
    return this._httpClient.post(`${this.baseUrl}Likes/add-or-remove-like/${userName}`, {})
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(`${this.baseUrl}Likes/get-liked-users`, params, this._httpClient)
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams();
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    console.log(Object.values(userParams).join(','));
    const lsUser = JSON.parse(localStorage.getItem('user')!);
    userParams.currentUserName = lsUser.userName;
    var response = this.memberCaching.get(Object.values(userParams).join(','));
    if (response) return of(response);
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
    params = params.append('currentUserName', userParams.currentUserName);

    return getPaginatedResult<Member[]>(this.baseUrl + 'Accounts/get-all-users',params, this._httpClient)
    .pipe(
      map((res) => {
        this.memberCaching.set(Object.values(userParams).join(','), res);
        return res;
      })
    );
  }



  getMemberByUserName(userName: string) {
    const member = [...this.memberCaching.values()]
    .reduce((previousValue, currentValue) => previousValue.concat(currentValue.result), [])
    .find((member: Member) => member.userName === userName);
    if(member) {
      return of(member);
    }
    return this._httpClient.get<Member>(this.baseUrl + 'Accounts/get-user-by-userName/' + userName);
  }

  updateMember(model: IUpdateMember) {
    return this._httpClient.put(this.baseUrl + 'Accounts/update-current-member', model);
  }

  uploadMemberPhoto(file: FormData) {
    return this._httpClient.post<Photo>(this.baseUrl + 'Accounts/upload-photo', file);
  }

  deletePhoto(photoId: number) {
    return this._httpClient.delete(this.baseUrl + `Accounts/remove-photo/${photoId}`);
  }

  setMainPhoto(photoId: number) {
    return this._httpClient.put(this.baseUrl + `Accounts/set-main-photo/${photoId}`, {});
  }

}
