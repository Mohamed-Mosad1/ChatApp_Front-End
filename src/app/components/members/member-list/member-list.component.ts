import { Pagination } from './../../../models/Pagination';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/core/services/members.service';
import { UserParams } from 'src/app/models/UserParams';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  members!: Member[];
  Pagination!: Pagination;
  userParams!: UserParams;
  genderList = [
    { key: 'male', value: 'Males' },
    { key: 'female', value: 'Females' },
  ];

  likedMembers: any
  predicate: string = 'liked';
  pageNumber: number = 1;
  pageSize: number = 8;
  pagination!: Pagination;
  likeUserNames: string[] = [];

  constructor(private _membersService: MembersService) {
    this.userParams = _membersService.getUserParams();
  }

  ngOnInit(): void {
    this.getMembers();
    this.loadLikes();
  }

  getMembers() {
    this._membersService.setUserParams(this.userParams);
    const sub = this._membersService.getMembers(this.userParams).subscribe({
      next: (res) => {
        this.members = res.result;
        this.Pagination = res.pagination;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.subscription.add(sub);
  }


  loadLikes() {
    this._membersService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
      next: (res) => {
        this.likedMembers = res.result
        this.pagination = res.pagination;
        // Extract userName from each member and log the result
        const likedUserNames = this.likedMembers.map((member:any) => member.userName);
        this.likeUserNames = likedUserNames
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
