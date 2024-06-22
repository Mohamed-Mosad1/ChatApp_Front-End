import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { Message } from 'src/app/models/messages';
import { AuthService } from 'src/app/core/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.scss'],
})
export class MemberMessageComponent implements OnInit {

  @ViewChild('messageForm') messageForm!: NgForm;
  messages: Message[] = [];
  @Input() userName: string = '';
  messageContent: string = '';
  currentUserName!: string;

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
          this.currentUserName = user.userName;
        }
      },
    });
  }

  getMessage(){
    this._messageService.messageRead$.subscribe({
      next: (messages:any) => {
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
      this.getMessage();
      this.messageForm.reset();
    });
  }


}
