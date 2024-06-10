import { Pagination } from './../../../models/Pagination';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/core/services/members.service';
import { UserParams } from 'src/app/models/UserParams';
import { AuthService } from 'src/app/core/services/auth.service';
import { take } from 'rxjs';
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
    { key: 'female', value: 'Females' }
  ];

  constructor(
    private _membersService: MembersService,
    private _authService: AuthService,
  ) {
    this._authService.currentUser$.pipe(take(1)).subscribe({
      next: (res) => {
        if (res) {
          this.user = res;
          this.userParams = new UserParams(res);
        }
      },
    })
  }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    this._membersService.getMembers(this.userParams).subscribe({
      next: (res) => {
        this.members = res.result
        this.Pagination = res.pagination;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.getMembers();
  }

  resetFilters() {
    this.userParams = new UserParams(this.user);
    this.getMembers();
  }
}
