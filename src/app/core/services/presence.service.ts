import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { IUser } from 'src/app/models/auth';
import { environment } from 'src/assets/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection!: HubConnection | null;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private _toastrService: ToastrService) {}

  createHubConnection(user: IUser): void {
    if (this.hubConnection) {
      this.stopHubConnection();
    }

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}presence`, {
        accessTokenFactory: () => user.token
      }).withAutomaticReconnect().build();

    this.hubConnection
      .start()
      .catch((error) => this.logError('Error starting connection', error));

    this.hubConnection.on('UserIsOnline', (username: string) => {
      this._toastrService.success(`${username} has connected`);
    });

    this.hubConnection.on('UserIsOffline', (username: string) => {
      this._toastrService.info(`${username} has disconnected`);
    });

    this.hubConnection.on('GetOnlineUsers', (userName: string[]) => {
      this.onlineUsersSource.next(userName);
    });

    this.hubConnection.onclose((error) => {
      if (error) {
        this.logError('Connection closed with error', error);
        console.log(error);

      }
    });
  }

  stopHubConnection(): void {
    if (this.hubConnection &&
      this.hubConnection.state === HubConnectionState.Connected) {
      this.hubConnection.stop()
        .catch((error) => this.logError('Error stopping connection', error))
        .finally(() => {
          this.hubConnection = null;
        });
    }
  }

  updateOnlineUsers(updatedUsers: string[]) {
    this.onlineUsersSource.next(updatedUsers);
  }

  private logError(message: string, error: any): void {
    console.error(message, error);
    this._toastrService.error(message);
  }
}
