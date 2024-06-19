import { Pagination } from './../../../models/Pagination';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/core/services/members.service';
import { UserParams } from 'src/app/models/UserParams';
import { IUser } from 'src/app/models/auth';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  members!: Member[] | null;
  Pagination!: Pagination;
  user!: IUser;
  userParams!: UserParams;
  genderList = [
    { key: 'male', value: 'Males' },
    { key: 'female', value: 'Females' },
  ];

  constructor(private _membersService: MembersService) {
    this.userParams = _membersService.getUserParams();
  }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    this._membersService.setUserParams(this.userParams);
    this._membersService.getMembers(this.userParams).subscribe({
      next: (res) => {
        this.members = res.result
        this.Pagination = res.pagination;
      },
      error: (err) => {
        console.log(err);
      },
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
