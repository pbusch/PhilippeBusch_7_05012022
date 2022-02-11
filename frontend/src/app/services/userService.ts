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
export class UserService {
  constructor(private http: HttpClient) {}

  public getUser(param: string): Observable<any> {
    return this.http.get<any>(AUTH_API + 'api/users/' + param, {});
  }
}
