import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { tap } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';

const AUTH_API = 'http://localhost:3000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
  //   null
  // );

  constructor(private http: HttpClient) {}

  public register(user: User): Observable<any> {
    return this.http.post<any>(AUTH_API + 'api/auth/singup', user);
  }

  // public login(email: string, password: string): Observable<User> {
  //   return this.http.post<User>(AUTH_API + 'api/auth/login', {
  //     email,
  //     password,
  //   });
  // }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(AUTH_API + 'api/auth/login', {
      email,
      password,
    });
    //.pipe(this.setSession);
  }

  //private setSession(authResult: { token: string }) {
  //const expiresAt = moment().add(authResult.expiresIn, 'second');

  //  localStorage.setItem('id_token', authResult.token);
  //localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  //}

  public signup(
    name: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post<any>(AUTH_API + 'api/auth/signup', {
      name,
      email,
      password,
    });
    //.pipe(retry(1), catchError(this.handleError));
  }

  // handleError(error: { error: { message: any }; status: any; message: any }) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(errorMessage);
  // }
}
