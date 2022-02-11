import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

const AUTH_API = 'http://localhost:3000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(AUTH_API + 'api/auth/login', {
      email,
      password,
    });
  }

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
  }

  public signOut() {
    localStorage.removeItem('token');
  }

  public loggedIn() {
    return !!localStorage.getItem('token');
  }
}
