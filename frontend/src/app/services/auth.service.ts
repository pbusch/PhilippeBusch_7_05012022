import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';

const AUTH_API = 'http://localhost:3000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(name: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        name,
        password,
      },
      httpOptions
    );
  }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'api/auth/signup',
      {
        name,
        email,
        password,
      },
      httpOptions
    );
  }
}
