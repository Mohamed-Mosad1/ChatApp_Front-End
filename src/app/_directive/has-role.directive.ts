import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { take } from 'rxjs';
import { IUser } from '../models/auth';

@Directive({
  selector: '[appHasRole]' /*appHasRole["Admin", "Member"]*/,
  standalone: true,
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole!: string[];
  user!: IUser;
  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _templateRef: TemplateRef<any>,
    private _authService: AuthService
  ) {
    this._authService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
        }
      },
    });
  }

  ngOnInit(): void {
    if (!this.user?.roles || this.user?.roles === null) {
      this._viewContainerRef.clear();
      return;
    }

    if (this.user?.roles.some((x) => this.appHasRole.includes(x))) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainerRef.clear();
    }
  }
}
