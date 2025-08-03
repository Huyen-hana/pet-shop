import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userLocal = localStorage.getItem('currentUser');
  if (!userLocal) {
    router.navigate(['/main/home']);
    return false;
  }

  try {
    const user = JSON.parse(userLocal);
    if (user && user.role === 'admin') {
      return true;
    };
  } catch (e) {
    console.error('Lỗi khi parse dữ liệu user:', e);
  };

  router.navigate(['/main/home']);
  return false;
};
