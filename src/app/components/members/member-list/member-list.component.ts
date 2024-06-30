import { Pagination } from './../../../models/Pagination';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/core/services/members.service';
import { UserParams } from 'src/app/models/UserParams';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MemberCardComponent } from '../member-card/member-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    ButtonsModule,
    MemberCardComponent,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonToggleModule
  ]
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
        console.error(err);
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
        console.error(err);
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
        console.error(err);
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
