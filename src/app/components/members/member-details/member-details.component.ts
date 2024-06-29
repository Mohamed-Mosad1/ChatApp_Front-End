import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryComponent, GalleryItem } from '@daelmaak/ngx-gallery';
import { TabDirective, TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageService } from 'src/app/core/services/message.service';
import { PresenceService } from 'src/app/core/services/presence.service';
import { IUser } from 'src/app/models/auth';
import { Member } from 'src/app/models/member';
import { IMessage } from 'src/app/models/messages';
import { environment } from 'src/environments/environment';
import { MemberMessageComponent } from '../member-message/member-message.component';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TabsModule,
    TimeagoModule,
    GalleryComponent,
    MemberMessageComponent,
  ],
})
export class MemberDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', { static: true }) memberTabs!: TabsetComponent;

  member!: Member;
  galleryImages!: GalleryItem[];
  activeTab!: TabDirective;
  messages: IMessage[] = [];
  user!: IUser;
  baseServerUrl: string = environment.baseServerUrl;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _messagesService: MessageService,
    public _presenceService: PresenceService,
    private _authService: AuthService,
    private _router: Router
  ) {
    _authService.currentUser$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });

    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this._activatedRoute.data.subscribe({
      next: (data) => {
        this.member = data['member'];
        this.galleryImages = this.getImages();
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._activatedRoute.queryParams.subscribe({
      next: (params) => {
        const tabIndex = params['tab'] ? +params['tab'] : 0;
        this.selectTab(tabIndex);
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

    const tabId = this.memberTabs.tabs.findIndex(
      (tab) => tab.heading === this.activeTab.heading
    );
    this.updateQueryParams(tabId);
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this._messagesService.createHubConnection(
        this.user,
        this.member.userName
      );
    } else {
      this._messagesService.stopHubConnection();
    }
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
    this.updateQueryParams(tabId);
  }

  updateQueryParams(tabId: number) {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { tab: tabId },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this._messagesService.stopHubConnection();
  }
}
