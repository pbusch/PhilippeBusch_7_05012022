import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { tap } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';
import { Post } from '../interfaces/post';
//import { stringify } from 'querystring';

const AUTH_API = 'http://localhost:3000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class postService {
  constructor(private http: HttpClient) {}

  public listPosts(): Observable<any> {
    return this.http.get<any>(AUTH_API + 'api/posts/');
  }

  public getOnePost(param: any): Observable<any> {
    return this.http.get<any>(AUTH_API + 'api/posts/' + param);
  }

  public getPostComments(param: any): Observable<any> {
    return this.http.get<any>(AUTH_API + 'api/posts/comments/' + param);
  }

  public updatePost(param: any, body: any): Observable<any> {
    return this.http.put<any>(AUTH_API + 'api/posts/' + param, body);
  }

  public addPost(body: any): Observable<any> {
    return this.http.post<any>(AUTH_API + 'api/posts/', body);
  }

  public deletePost(param: any): Observable<any> {
    return this.http.delete<any>(AUTH_API + 'api/posts/' + param);
  }

  public addComment(param: any, text: string): Observable<any> {
    return this.http.post<any>(AUTH_API + 'api/posts/comments/' + param, {
      text,
    });
  }
}
