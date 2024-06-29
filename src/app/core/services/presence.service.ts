import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, take } from 'rxjs';
import { IUser } from 'src/app/models/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection!: HubConnection | null;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private _toastrService: ToastrService, private _router:Router) {}

  createHubConnection(user: IUser): void {
    if (this.hubConnection) {
      this.stopHubConnection();
    }

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}presence`, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch((error) => this.logError('Error starting connection', error));

    this.hubConnection.on('UserIsOnline', (userName: string) => {
      this.onlineUsers$.pipe(take(1)).subscribe({
        next: (userNames) => {
          this.onlineUsersSource.next([...userNames, userName]);
        }
      })
      this._toastrService.success(`${userName} has connected`);
    });

    this.hubConnection.on('UserIsOffline', (userName: string) => {
      this.onlineUsers$.pipe(take(1)).subscribe({
        next: (userNames) => {
          this.onlineUsersSource.next([...userNames.filter((x) => x !== userName)])
        }
      })
      this._toastrService.info(`${userName} has disconnected`);
    });

    this.hubConnection.on('GetOnlineUsers', (userNames: string[]) => {
      this.onlineUsersSource.next(userNames);
    });

    this.hubConnection.on('NewMessageReceived', ({userName, knownAs, content}) => {
      if (userName !== user.userName) {
        this._toastrService.show(content, `New message from ${knownAs}`)
        .onTap.pipe(take(1)).subscribe(() => this._router.navigateByUrl('/member/' + userName + '?tab=3'));
      }
    })

    this.hubConnection.onclose((error) => {
      if (error) {
        this.logError('Connection closed with error', error);
        console.log(error);
      }
    });
  }

  stopHubConnection(): void {
    if (
      this.hubConnection &&
      this.hubConnection.state === HubConnectionState.Connected
    ) {
      this.hubConnection
        .stop()
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
