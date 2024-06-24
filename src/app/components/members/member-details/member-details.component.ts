import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem } from '@daelmaak/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';
import { PresenceService } from 'src/app/core/services/presence.service';
import { IUser } from 'src/app/models/auth';
import { Member } from 'src/app/models/member';
import { IMessage } from 'src/app/models/messages';
import { environment } from 'src/assets/environments/environment';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', { static: true }) memberTabs!: TabsetComponent;

  member!: Member;
  galleryImages!: GalleryItem[];
  activeTab!: TabDirective;
  messages: IMessage[] = [];
  user!: IUser;
  baseServerUrl: string = environment.baseServerUrl

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _messagesService: MessageService,
    public _presenceService: PresenceService,
    private _authService: AuthService,
  ) {
    _authService.currentUser$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
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
    });
    this._activatedRoute.queryParams.subscribe({
      next: (params) => {
        params['tab'] ? this.selectTab(params['tab']) : this.selectTab(0);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getImages(): GalleryItem[] {
    const imageUrls: GalleryItem[] = [];
    if (this.member.photos && Array.isArray(this.member.photos)) {
      for (const photo of this.member.photos) {
        imageUrls.push({ src: photo.url, thumbSrc: photo.url });
      }
    }
    return imageUrls;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this._messagesService.createHubConnection(this.user, this.member.userName);
    } else {
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
