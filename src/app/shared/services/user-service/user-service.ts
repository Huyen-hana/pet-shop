import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = 'https://687fdb48f1dcae717b6070d0.mockapi.io/user'
  private http = inject(HttpClient)
  
  private getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`)
  }
  
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
  checkHaveUser(userName: string, email: string): Observable<boolean> {
    return this.getAllUser().pipe(
      map((allUser: User[]) => {
        return allUser.some((user: User) => 
          user.fullname === userName && user.email === email
        );
      }),
      catchError(error => {
        console.error('Loi khi kiem tra su ton tai cua nguoi dung: ', error);
        return of(false)
      })
    )
  }
}
