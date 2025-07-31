import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'currentUser';
  private router = inject(Router);

  // set user to localStorage
  private setCurrentUser(name: string, role: string, avatar: string): void {
    const user = {
      userName: name,
      role: role,
      avatar: avatar
    };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getCurrentUser(): {userName: string, role: string, avatar: string} | null {
    try {
      const userString = localStorage.getItem(this.USER_KEY);
      const user = userString ? JSON.parse(userString) : null;
  
      if (user && user.userName && user.role && user.avatar) {
        return user;
      } else {
        return null;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Lỗi khi đọc thông tin người dùng:', error.message);
      }
      return null;
    }  
  }

  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  };

  getUserName(): string | null {
    const user = this.getCurrentUser();
    return user ? user.userName : null;
  };

  getAvatar(): string | null {
    const user = this.getCurrentUser();
    return user ? user.avatar : null;
  }

  isLogin(): boolean {
    return this.getCurrentUser() !== null;
  }

  logOut(): void {
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/main/home'])
  }
}
