import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { MembersService } from 'src/app/core/services/members.service';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnInit {
  member!: Member;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(
    private _membersService: MembersService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMembers();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
    ];
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls: NgxGalleryImage[] = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    }
    return imageUrls;
  }

  loadMembers() {
    this._membersService
      .getMemberByUserName(this._activatedRoute.snapshot.paramMap.get('userName') ?? '')
      .subscribe({
        next: (res) => {
          if (res) {
            console.log(res);
            this.member = res;
            this.galleryImages = this.getImages();
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}
