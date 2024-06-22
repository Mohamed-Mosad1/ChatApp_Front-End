import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { Message } from 'src/app/models/messages';
import { Pagination } from 'src/app/models/Pagination';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages!:Message[] | null;
  pagination!: Pagination;
  container: string = 'UnRead';
  pageNumber: number = 1;
  pageSize: number = 8;
  loading:boolean = false;

  constructor(private _messageService: MessageService, private _toastrService: ToastrService) { }


  ngOnInit(): void {
    this.loadMessages();

  }

  loadMessages() {
    this.loading = true;
    this._messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next: (res) => {
        if(res){
          this.messages = res.result;
          this.pagination = res.pagination;
          this.loading = false;
          console.log(this.messages);

        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    console.log(this.pageNumber);

    this.loadMessages();
  }

  deleteMessage(id: number) {
    this._messageService.deleteMessage(id).subscribe({
      next: () => {
        let index = this.messages?.findIndex(m => m.id === id)
        if(index) this.messages?.splice(index, 1);
        this._toastrService.success('Message deleted successfully');
        this.loadMessages();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
