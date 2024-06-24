import { Pagination } from './../../../models/Pagination';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/core/services/members.service';
import { UserParams } from 'src/app/models/UserParams';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {

  members!: Member[] | null;
  Pagination!: Pagination;
  userParams!: UserParams;
  genderList = [
    { key: 'Male', value: 'Males' },
    { key: 'Female', value: 'Females' },
  ];

  predicate: string = 'liked';
  pageNumber: number = 1;
  pageSize: number = 8;
  likeUserNames: string[] = [];


  constructor(private _membersService: MembersService) {
    this.userParams = _membersService.getUserParams();
  }

  ngOnInit(): void {
    this.getMembers();
    this.loadLikes();
    this._membersService.likedUserNames$.subscribe({
      next: (res) => {
        this.likeUserNames = res;
        this.getMembers();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getMembers() {
    this._membersService.setUserParams(this.userParams);
    this._membersService.getMembers(this.userParams).subscribe({
      next: (res) => {
        this.members = res.result;
        this.Pagination = res.pagination;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  loadLikes() {
    this._membersService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: (res) => {
        this.members = res.result;
        this.Pagination = res.pagination;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  pageChanged(event: any) {
    this._membersService.setUserParams(this.userParams);
    this.userParams.pageNumber = event.page;
    this.getMembers();
  }

  resetFilters() {
    this.userParams = this._membersService.resetUserParams();
    this.getMembers();
  }


}
