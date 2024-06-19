import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/core/services/members.service';
import { PresenceService } from 'src/app/core/services/presence.service';
import { Member } from 'src/app/models/member';
import { environment } from 'src/assets/environments/environment';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent {
  @Input() member!: Member;
  baseServerUrl: string = environment.baseServerUrl;

  constructor(
    private _membersService: MembersService,
    private _toasterService: ToastrService,
    public _presenceService: PresenceService
  ) {}

  addLike(userName: string) {
    this._membersService.addLike(userName).subscribe({
      next: () => {
        this._toasterService.success('You have liked ' + this.member.userName);
      },
      error: (err) => {
        this._toasterService.error(err.error);
      },
    });
  }
}
