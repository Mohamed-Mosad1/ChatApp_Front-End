import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { IMessage } from 'src/app/models/messages';
import { Pagination } from 'src/app/models/Pagination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';
import { RouterLink } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonsModule,
    PaginationModule,
    TimeagoModule
  ]
})
export class MessagesComponent implements OnInit {
  messages!: IMessage[] | null;
  pagination!: Pagination;
  container: string = 'UnRead';
  pageNumber: number = 1;
  pageSize: number = 8;

  constructor(
    private _messageService: MessageService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    // debugger
    this._messageService
    .getMessages(this.pageNumber, this.pageSize, this.container)
    .subscribe({
        next: (res) => {
          if (res) {
            this.messages = res.result;
            this.pagination = res.pagination;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this._messageService.deleteMessage(id).subscribe({
      next: () => {
        let index = this.messages?.findIndex((m) => m.id === id);
        if (index) this.messages?.splice(index, 1);
        this._toastrService.success('Message deleted successfully');
        // this.loadMessages();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
