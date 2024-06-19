import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';
import { PresenceService } from 'src/app/core/services/presence.service';
import { IUser } from 'src/app/models/auth';
import { Member } from 'src/app/models/member';
import { Message } from 'src/app/models/messages';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnInit,OnDestroy {

  @ViewChild('memberTabs', {static: true}) memberTabs!: TabsetComponent;

  member!: Member;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  activeTab!:TabDirective;
  messages:Message[] = [];
  user!:IUser;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _messagesService: MessageService,
    public _presenceService: PresenceService,
    private _authService: AuthService
  ) {
    _authService.currentUser$.pipe(take(1)).subscribe(user=>{
      if(user){
        this.user =user
      }
    })
  }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe({
      next: (data) => {
        this.member = data['member'];
        this.galleryImages = this.getImages();
      },
      error: (err) => {
        console.log(err);
      }
    })

    this._activatedRoute.queryParams.subscribe({
      next: (params) => {
        params['tab'] ? this.selectTab(params['tab']) : this.selectTab(0);
      },
      error: (err) => {
        console.log(err);
      }
    })
    // this.loadMembers();

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

  // loadMembers() {
  //   this._membersService
  //     .getMemberByUserName(this._activatedRoute.snapshot.paramMap.get('userName') ?? '')
  //     .subscribe({
  //       next: (res) => {
  //         if (res) {
  //           this.member = res;
  //           this.galleryImages = this.getImages();
  //         }
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       }
  //     });
  // }

  loadMessages() {
    this._messagesService.getMesageIsRead(this.member.userName).subscribe({
      next: (res) => {
        this.messages = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onTabActivated(data:TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.messages.length === 0){
      // this.loadMessages();
      this._messagesService.createHubConnection(this.user, this.member.userName);
    }else{
      this._messagesService.stopHubConnection();
    }
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  ngOnDestroy(): void {
    this._messagesService.stopHubConnection();
  }

}
