import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MembersService } from 'src/app/core/services/members.service';
import { IUser } from 'src/app/models/auth';
import { Member } from 'src/app/models/member';
import { environment } from 'src/environments/environment';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { CommonModule, DatePipe } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PhotoEditorComponent,
    TimeagoModule,
    TabsModule,
    ReactiveFormsModule,
    FormsModule,
    DatePipe
  ]
})
export class MemberEditComponent implements OnInit {
  user!: IUser;
  member!: Member;
  editMemberForm!: FormGroup;
  baseServerUrl: string = environment.baseServerUrl;
  @HostListener('window:beforeunload', ['$event']) unLoadNotification(
    $event: any
  ) {
    if (this.editMemberForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private _authService: AuthService,
    private _membersService: MembersService,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._authService.currentUser$.pipe(take(1)).subscribe({
      next: (res) => {
        if (res) this.user = res;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.editMemberForm = this._formBuilder.group({
      introduction: ['', [Validators.required]],
      lookingFor: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      interests: ['', [Validators.required]],
    });

    this.loadMember();
  }

  loadMember() {
    this._membersService.getMemberByUserName(this.user.userName).subscribe({
      next: (res) => {
        if (res) {
          this.member = res;
          this.editMemberForm.setValue({
            introduction: this.member.introduction,
            lookingFor: this.member.lookingFor,
            city: this.member.city,
            country: this.member.country,
            interests: this.member.interests,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateMember() {
    this._membersService.updateMember(this.editMemberForm.value).subscribe({
      next: (res) => {
        this.editMemberForm.reset(this.member);
        this.loadMember();
        this._toastrService.success('Member updated successfully');
      },
      error: (err) => {
        this._toastrService.error(err.message);
        console.log(err);
      },
    });
  }
}