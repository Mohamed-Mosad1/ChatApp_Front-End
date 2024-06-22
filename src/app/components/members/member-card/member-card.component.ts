import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/core/services/members.service';
import { PresenceService } from 'src/app/core/services/presence.service';
import { IBaseResponse } from 'src/app/models/baseCommonResponse';
import { Member } from 'src/app/models/member';
import { environment } from 'src/assets/environments/environment';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent {
  @Input() member!: Member;
  @Input() likedUserNames: string[] = [];
  likeName: string= '';

  baseServerUrl: string = environment.baseServerUrl;

  constructor(
    private _membersService: MembersService,
    private _toasterService: ToastrService,
    public _presenceService: PresenceService
  ) {    }

  addOrRemoveLike(userName: string) {
    this._membersService.addOrRemoveLike(userName).subscribe({
      next: (res: IBaseResponse) => {
        this.likeName = res.data.likedUserName;
        if (res.message.includes('unliked')) {
          const index = this.likedUserNames.indexOf(this.likeName);
          if (index !== -1) {
            this.likedUserNames.splice(index, 1);
          }
          this._toasterService.info(res.message + this.member.userName);
        } else {
          this.likedUserNames.push(this.likeName);
          this._toasterService.success(res.message + this.member.userName);
        }
      },
      error: (err) => {
        this._toasterService.error(err.error);
      },
    });
  }





}
