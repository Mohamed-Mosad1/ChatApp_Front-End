import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return authService.currentUser$.pipe(
    map((user) => {
      if (user) {
        return true;
      }
        router.navigate(['/login']);
        toastr.error('You need to login first');
        return false;
    })
  )

};
