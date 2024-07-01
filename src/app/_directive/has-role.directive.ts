import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { take } from 'rxjs/operators';
import { IUser } from '../models/auth';

@Directive({
  selector: '[appHasRole]' /* appHasRole["Admin", "Moderator"] */,
  standalone: true,
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole!: string[];
  private user!: IUser | null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        this.user = user;
        this.updateView();
      },
      error: (err) => {
        console.error('Error fetching user roles:', err);
        this.viewContainerRef.remove();
      }
    });
  }

  private updateView(): void {
    this.viewContainerRef.remove(); // Clear the view container initially

    if (!this.user?.roles) {
      return;
    }

    const hasRole = this.user.roles.some((role) => this.appHasRole.includes(role));

    if (hasRole) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
