import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { tap } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';

const USER_API = 'http://localhost:3000/api/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userTotalPosts: any = 0;
  public userTotalLikes: any = 0;
  public userTotalComments: any = 0;

  constructor(private http: HttpClient) {}

  public getUser(param: string): Observable<any> {
    return this.http.get<any>(USER_API + param, { observe: 'response' }).pipe(
      tap((res) => {
        this.userTotalPosts = res.headers.get('x-total-posts');
        this.userTotalComments = res.headers.get('x-total-comments');
        this.userTotalLikes = res.headers.get('x-total-likes');
      })
    );
  }

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(USER_API).pipe(tap((res) => {}));
  }

  public updateUser(
    param: any,
    password: string,
    newPassword: string,
    name: any,
    level: any,
    email: any
  ): Observable<any> {
    return this.http
      .put<any>(USER_API + param, {
        password,
        newPassword,
        name,
        level,
        email,
      })
      .pipe(tap(() => {}));
  }

  public delUser(param: string): Observable<any> {
    return this.http.delete<any>(USER_API + param, {}).pipe(tap((res) => {}));
  }
}
