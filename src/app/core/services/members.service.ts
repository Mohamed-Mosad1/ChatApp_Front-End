import { UserParams } from './../../models/UserParams';
import { PaginatedResult } from './../../models/Pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { IUpdateMember, Member, Photo } from '../../models/member';
import { Observable, map, of, finalize, take } from 'rxjs';
import { AuthService } from './auth.service';
import { IUser } from 'src/app/models/auth';

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
          this.userParams = new UserParams(res);
        }
      },
    })
  }

  addLike(userName: string) {
    return this._httpClient.post(`${this.baseUrl}Likes/add-like/${userName}`, {})
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = this.getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    // return this._httpClient.get(`${this.baseUrl}Likes/get-liked-users`)
    return this.getPaginatedResult<Partial<Member[]>>(`${this.baseUrl}Likes/get-liked-users`, params)
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    console.log(Object.values(userParams).join(','));
    var response = this.memberCaching.get(Object.values(userParams).join(','));
    if (response) return of(response);
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<Member[]>(this.baseUrl + 'Accounts/get-all-users',params)
    .pipe(
      map((res) => {
        this.memberCaching.set(Object.values(userParams).join(','), res);
        return res;
      })
    );
  }

  private getPaginatedResult<T>(url: any, params: any) {
    const paginatedResult: PaginatedResult<T | null> = new PaginatedResult<T>();
    return this._httpClient.get<T>(url, { observe: 'response', params })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          let pagination = response.headers.get('Pagination');
          if (pagination !== null) {
            paginatedResult.pagination = JSON.parse(pagination);
          }
          return paginatedResult;
        }));
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
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
