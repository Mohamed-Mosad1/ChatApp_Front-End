import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/core/services/members.service';
import { Pagination } from 'src/app/models/Pagination';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  members: Partial<Member[] | null> = [];
  predicate: string = 'liked';
  pageNumber: number = 1;
  pageSize: number = 8;
  pagination!: Pagination;

  constructor(private _memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this._memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: (res) => {
        console.log(res);
          this.members = res.result;
          this.pagination = res.pagination;

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }


}
