import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MembersService } from 'src/app/core/services/members.service';
import { Pagination } from 'src/app/models/Pagination';
import { Member } from 'src/app/models/member';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MemberCardComponent } from '../members/member-card/member-card.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonsModule,
    MemberCardComponent
  ]
})
export class ListsComponent implements OnInit {

  members: Partial<Member[] | null> = [];
  predicate: string = 'liked';
  pageNumber: number = 1;
  pageSize: number = 8;
  pagination!: Pagination;
  likeUserNames!: string[];

  constructor(private _memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();

    this._memberService.likedUserNames$.subscribe({
      next: (res) => {
        this.likeUserNames = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadLikes() {
    this._memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: (res) => {
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
