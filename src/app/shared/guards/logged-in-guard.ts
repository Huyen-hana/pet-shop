import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  try {
    const userLocal = localStorage.getItem('currentUser');
    if (userLocal) {
      router.navigate(['/main/home']);
      return false;
    };
  } catch (e) {
    return false;
  }
  return true;
};
