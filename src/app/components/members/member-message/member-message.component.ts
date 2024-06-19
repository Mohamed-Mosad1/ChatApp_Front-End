import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { Message } from 'src/app/models/messages';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.scss'],
})
export class MemberMessageComponent implements OnInit {

  @ViewChild('messageForm') messageForm!: NgForm;
  @Input() messages: Message[] = [];
  @Input() userName: string = '';
  messageContent: string = '';

  constructor(
    public _messageService: MessageService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  sendMessage() {
    if(this.messageForm.invalid) {
      this._toastrService.warning('Please enter a message');
      return;
    }
    this._messageService.sendMessage(this.userName, this.messageContent).then(message =>{
      this.messageForm.reset();
    });
  }


}
