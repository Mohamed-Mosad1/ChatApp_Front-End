import { UserParams } from './../../models/UserParams';
import { PaginatedResult } from './../../models/Pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { IUpdateMember, Member, Photo } from '../../models/member';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.baseUrl;

  constructor(private _httpClient: HttpClient) {}

  getMembers(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    console.log(params);

    return this.getPaginatedResult<Member[]>(this.baseUrl + 'Accounts/get-all-users',params);
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
    return this._httpClient.get<Member>(this.baseUrl + 'Accounts/get-user-by-userName/' + userName);
  }

  updateMember(model: IUpdateMember) {
    return this._httpClient.put(this.baseUrl + 'Accounts/update-current-member', model);
  }

  uploadMemberPhoto(file: FormData) : Observable<Photo> {
    return this._httpClient.post<Photo>(this.baseUrl + 'Accounts/upload-photo', file);
  }

  deletePhoto(photoId: number) {
    return this._httpClient.delete(this.baseUrl + `Accounts/remove-photo/${photoId}`);
  }

  setMainPhoto(photoId: number) {
    return this._httpClient.put(this.baseUrl + `Accounts/set-main-photo/${photoId}`, {});
  }

}
