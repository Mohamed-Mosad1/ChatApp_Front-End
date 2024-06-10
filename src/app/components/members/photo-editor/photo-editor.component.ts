import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { MembersService } from 'src/app/core/services/members.service';
import { IUser } from 'src/app/models/auth';
import { Member, Photo } from 'src/app/models/member';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() member!: Member;
  selectedFile!: File;
  currentUserImage!: string | ArrayBuffer | undefined | null;
  user!: IUser | null;

  @ViewChild('photoMember') memberProfilePhoto!: ElementRef;

  constructor(
    private _memberService: MembersService,
    private _toastrService: ToastrService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._authService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user,
      error: err => console.error('Error fetching current user:', err)
    });
  }

  private getMember(): void {
    const user = this.user;
    if (user) {
      this._memberService.getMemberByUserName(user.userName).subscribe({
        next: member => this.member = member,
        error: err => {
          this._toastrService.error('Error fetching member details');
          console.error('Error fetching member details:', err);
        }
      });
    }
  }

  uploadPhoto(): void {
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this._memberService.uploadMemberPhoto(formData).subscribe({
      next: (res : any) => {
        this._toastrService.success('Photo uploaded successfully');
        this.reset();
        this.member.photos.push(res);
      },
      error: (err) => {
        this._toastrService.error('Error uploading photo');
        console.error('Error uploading photo:', err);
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      this.selectedFile = files[0];
      const reader = new FileReader();
      reader.onload = e => this.currentUserImage = e.target?.result;
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.currentUserImage = null;
    }
  }

  reset(): void {
    this.memberProfilePhoto.nativeElement.value = '';
    this.currentUserImage = null;
  }

  deleteMemberPhoto(photoId: number): void {
    this._memberService.deletePhoto(photoId).subscribe({
      next: () => {
        this._toastrService.success('Photo deleted successfully');
        this.getMember();
      },
      error: (err) => {
        this._toastrService.error('Error deleting photo');
        console.error('Error deleting photo:', err);
      }
    });
  }

  setMainMemberPhoto(photo: Photo): void {
    this._memberService.setMainPhoto(photo.id).subscribe({
      next: res => {
        if (res) {
          this.member.photoUrl = photo.url;
          if (this.user) {
            this.user.photoUrl = photo.url;
            this._authService.setCurrentUser(this.user);
          }
          this.member.photos.forEach(p => {
            if(p.isMain) p.isMain = false;
            if(p.id === photo.id) p.isMain = true;
          })
          this._toastrService.success('Main photo set successfully');
        }
      },
      error: (err) => {
        this._toastrService.error('Error setting main photo');
        console.error('Error setting main photo:', err);
      }
    });
  }
}
