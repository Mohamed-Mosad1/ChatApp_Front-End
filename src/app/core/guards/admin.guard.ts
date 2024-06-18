import { map } from 'rxjs';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route) => {
  const _authService = inject(AuthService);
  const _toastrService = inject(ToastrService);

  return _authService.currentUser$.pipe(
    map((user) => {
      if(user?.roles.includes('Admin') || user?.roles.includes('Moderator')){
        return true;
      }

      _toastrService.error('You are not authorized to access this page');
      return false;
    })
  )
};
