import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { Message } from 'src/app/models/messages';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.scss']
})
export class MemberMessageComponent implements OnInit {

  @Input() userName: string = '';
  messages: Message[] = [];

  constructor(private _messagesService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this._messagesService.getMesageIsRead(this.userName).subscribe({
      next: (res) => {
        this.messages = res;
        console.log(res);

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
