import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './PaginationHelper';
import { Message } from 'src/app/models/messages';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl: string = environment.baseUrl;

  constructor(private _httpClient: HttpClient) { }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Message[]>(this.baseUrl + 'Messages/get-messages-for-user' , params, this._httpClient);
  }

  getMesageIsRead(userName: string) {
    return this._httpClient.get<Message[]>(this.baseUrl + 'Messages/mark-message-as-read/' + userName);
  }
}
