import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './PaginationHelper';
import { IMessage } from 'src/app/models/messages';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { IUser } from 'src/app/models/auth';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl: string = environment.baseUrl;
  hubUrl: string = environment.hubUrl;
  private hubConnection!: HubConnection;
  private messageReadSource = new BehaviorSubject<IMessage[]>([]);
  messageRead$ = this.messageReadSource.asObservable();

  constructor(private _httpClient: HttpClient) {}

  createHubConnection(user: IUser, otherUserName: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUserName, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error.message));

    this.hubConnection.on('ReceiveMessageRead', (messages) => {
      this.messageReadSource.next(messages);
    });

    this.hubConnection.on('NewMessage', (newMessage) => {
      this.messageRead$.pipe(take(1)).subscribe({
        next: (messages) => {
          this.messageReadSource.next([...messages, newMessage]);
        },
      });
    });
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<IMessage[]>(
      this.baseUrl + 'Messages/get-messages-for-user',
      params,
      this._httpClient
    );
  }

  getMesageIsRead(userName: string) {
    return this._httpClient.get<IMessage[]>(
      this.baseUrl + 'Messages/mark-message-as-read/' + userName
    );
  }

  async sendMessage(userName: string, content: string) {
    return this.hubConnection
      .invoke('SendMessage', { recipientUsername: userName, content })
      .catch((error) => console.log(error));
  }

  deleteMessage(id: number) {
    return this._httpClient.delete(
      this.baseUrl + 'Messages/delete-message/' + id
    );
  }
}
