import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { IMessage } from 'src/app/models/messages';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription, take } from 'rxjs';
import { IUser } from 'src/app/models/auth';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.scss'],
})
export class MemberMessageComponent implements OnInit, OnDestroy {

  @ViewChild('messageForm') messageForm!: NgForm;
  messages: IMessage[] = [];
  @Input() userName: string = '';
  messageContent: string = '';
  currentUserName: string = '';
  user!: IUser;
  private messageSubscription!: Subscription

  constructor(
    public _messageService: MessageService,
    public _authService: AuthService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMessage();

    this._authService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
          this.currentUserName = user.userName;
        }
      },
    });
  }

  getMessage(){
    this.messageSubscription = this._messageService.messageRead$.subscribe({
      next: (messages) => {
        this.messages = messages
      },
    })
  }

  sendMessage() {
    if(this.messageForm.invalid) {
      this._toastrService.warning('Please enter a message');
      return;
    }
    this._messageService.sendMessage(this.userName, this.messageContent).then(() =>{
      this.messageForm.reset();
    });
  }

  ngOnDestroy(): void {
    this._messageService.stopHubConnection();
    this.messageSubscription.unsubscribe();
  }


}
