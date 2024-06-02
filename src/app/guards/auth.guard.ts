import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  const user = localStorage.getItem('user');
  if (user) {
    return true;
  }else{
    router.navigate(['/home']);
    toastr.error('You need to login first');
  }

  return false;
};
