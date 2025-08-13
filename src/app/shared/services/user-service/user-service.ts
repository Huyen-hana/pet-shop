import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url: string = 'https://687fdb48f1dcae717b6070d0.mockapi.io/user';
  private http = inject(HttpClient);
  
  private getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  };
  private getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  };

  private getUserByEmail(email: string): Observable<User | null> {
    const queryParams = new HttpParams().set('email', email.trim().toLowerCase());
    return this.http.get<User[]>(`${this.url}`, { params: queryParams }).pipe(
      map(users => users.length > 0 ? users[0] : null),
      catchError(error => {
        console.error('Lỗi khi gọi getUserByEmail:', error);
        return of(null);
      })
    );
  };
  
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  };

  checkHaveUser(passWord?: string, email?: string): Observable<{ fullName: string; avatar: string | undefined; role: string } | null> {
    if (!email || !passWord) {
      return of(null);
    };
  
    return this.getUserByEmail(email).pipe(
      map((user: User | null) => {
        if (!user || !user.passWord) {
          return null;
        };
        const isMatch =
          user.passWord === passWord.trim() &&
          user.email === email.trim();
  
        if (isMatch) {
          return {
            fullName: user.fullName,
            avatar: user.avatar,
            role: user.role
          };
        };
  
        return null;
      }),
      catchError(error => {
        console.error('Lỗi khi kiểm tra user:', error);
        return of(null);
      })
    );
  };
  
  checkUserByEmail(email?: string): Observable<boolean> {
    if (!email) {
      return of(false);
    };
    return this.getUserByEmail(email).pipe(
      map((user: User | null) => !!user),
      catchError(error => {
        console.error('Lỗi khi kiểm tra email:', error);
        return of(false);
      })
    );
  };
  
}
