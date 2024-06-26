import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './core/services/auth.service';
import { IUser } from './models/auth';
import { PresenceService } from './core/services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';

  baseUrl: string = environment.baseUrl;

  constructor(
    private _authService: AuthService,
    private _presenceService: PresenceService
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const lsUser = localStorage.getItem('user');
    if (lsUser) {
      const user: IUser = JSON.parse(lsUser);
      this._authService.setCurrentUser(user);
      this._presenceService.createHubConnection(user);
    }
  }
}
