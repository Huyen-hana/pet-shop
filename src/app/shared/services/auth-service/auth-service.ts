import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'currentUser';
  
  private _isLoggedIn = new BehaviorSubject<boolean>(true);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  private currentUserSubject = new BehaviorSubject<any | null>(null);

  constructor() {
    const isLoggedIn = !localStorage.getItem(this.USER_KEY);
    this._isLoggedIn.next(isLoggedIn);
  };

  // set user to localStorage
  setCurrentUser(name: string, avatar: string, role: string): void {
    const user = {
      userName: name,
      avatar: avatar,
      role: role
    };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  };

  getCurrentUser(): {userName: string, avatar: string} | null {
    try {
      const userString = localStorage.getItem(this.USER_KEY);
      const user = userString ? JSON.parse(userString) : null;
  
      if (user && user.userName) {
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
  };

  getUserName(): Observable<string | null> {
    return this.currentUserSubject.asObservable().pipe(
      map(user => user ? user.userName : null)
    );
  };
  getAvatar(): Observable<string | null> {
    return this.currentUserSubject.asObservable().pipe(
      map(user => user ? user.avatar : null)
    );
  };
  getRole(): Observable<string | null> {
    return this.currentUserSubject.asObservable().pipe(
      map(user => user ? user.role : null)
    );
  };

  //setup inital user local when destroy component
  loadUserFromLocalStorage(): void {
    const userRaw = localStorage.getItem(this.USER_KEY);
    if (userRaw) {
      try {
        const user = JSON.parse(userRaw);
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Lỗi khi parse user từ localStorage:', e);
      };
    };
  };

  logOut(): void {
    localStorage.removeItem(this.USER_KEY);
    this._isLoggedIn.next(true);
  };
  
  login() {
    this._isLoggedIn.next(false);
  };

}
