import { UserParams } from './../../models/UserParams';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUpdateMember, Member, Photo } from '../../models/member';
import { BehaviorSubject, Observable, ReplaySubject, map, take } from 'rxjs';
import { AuthService } from './auth.service';
import { IUser } from 'src/app/models/auth';
import { getPaginatedResult, getPaginationHeaders } from './PaginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.baseUrl;
  private currentLikedUserNames = new BehaviorSubject<string[]>([]);
  likedUserNames$ = this.currentLikedUserNames.asObservable();

  user!: IUser;
  userParams!: UserParams;

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {
    _authService.currentUser$.pipe(take(1)).subscribe({
      next: (res) => {
        if (res) {
          this.user = res;
          this.userParams = new UserParams();
        }
      },
    });
  }

  addOrRemoveLike(userName: string): Observable<any> {
    return this._httpClient.post(
      `${this.baseUrl}Likes/add-or-remove-like/${userName}`,
      {}
    );
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Predicate', predicate);
    return getPaginatedResult<Partial<Member[]>>(
      `${this.baseUrl}Likes/get-liked-users`,
      params,
      this._httpClient
    ).pipe(
      map((data: any) => {
        this.currentLikedUserNames.next(
          data.result.map((member: any) => member.userName)
        );
        return data;
      })
    );
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
    const lsUser = JSON.parse(localStorage.getItem('user')!);
    userParams.currentUserName = lsUser.userName;
    let params = getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
    params = params.append('currentUserName', userParams.currentUserName);

    return getPaginatedResult<Member[]>(
      this.baseUrl + 'Accounts/get-all-users',
      params,
      this._httpClient
    );
  }

  getMemberByUserName(userName: string) {
    return this._httpClient.get<Member>(
      this.baseUrl + 'Accounts/get-user-by-userName/' + userName
    );
  }

  updateMember(model: IUpdateMember) {
    return this._httpClient.put(
      this.baseUrl + 'Accounts/update-current-member',
      model
    );
  }

  uploadMemberPhoto(file: FormData) {
    return this._httpClient.post<Photo>(
      this.baseUrl + 'Accounts/upload-photo',
      file
    );
  }

  deletePhoto(photoId: number) {
    return this._httpClient.delete(
      this.baseUrl + `Accounts/remove-photo/${photoId}`
    );
  }

  setMainPhoto(photoId: number) {
    return this._httpClient.put(
      this.baseUrl + `Accounts/set-main-photo/${photoId}`,
      {}
    );
  }
}
