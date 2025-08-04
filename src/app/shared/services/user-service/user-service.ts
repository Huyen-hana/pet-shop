import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url: string = 'https://687fdb48f1dcae717b6070d0.mockapi.io/user';
  private http = inject(HttpClient)
  
  private getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }
  
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  checkHaveUser(passWord?: string, email?: string): Observable<{ fullName: string; avatar: string | undefined; role: string } | null> {
    return this.getAllUser().pipe(
      map((allUser: User[]) => {
        const matchedUser = allUser.find((user: User) =>
          user.passWord.trim() === passWord?.trim() &&
          user.email.trim().toLowerCase() === email?.trim().toLowerCase()
        );
        if (matchedUser) {
          return {
            fullName: matchedUser.fullName,
            avatar: matchedUser.avatar,
            role: matchedUser.role
          };
        }
        return null;
      }),
      catchError(error => {
        console.error('Lỗi khi kiểm tra user:', error);
        return of(null);
      })
    );
  }
  
  checkUserByEmail(email?: string): Observable<boolean> {
    return this.getAllUser().pipe(
      map((allUser: User[]) => {
        return allUser.some(user =>
          user.email.trim().toLowerCase() === email?.trim().toLowerCase()
        );
      }),
      catchError(error => {
        console.error('Lỗi khi kiểm tra email:', error);
        return of(false);
      })
    );
  }
}
