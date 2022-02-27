import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../interfaces/post';

const POST_API = 'http://localhost:3000/api/posts/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class postService {
  public posts$: BehaviorSubject<Post[] | []> = new BehaviorSubject<
    Post[] | []
  >([]);

  constructor(private http: HttpClient) {}

  public fetchPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(POST_API).pipe(
      tap((res) => {
        this.posts$.next(res);
      })
    );
  }

  public getOnePost(param: any): Observable<any> {
    return this.http.get<any>(POST_API + param);
  }

  public getPostComments(id: string): Observable<any> {
    return this.http.get<any>(`${POST_API}${id}/comments/`);
  }

  public updatePost(param: any, body: any): Observable<any> {
    return this.http.put<any>(POST_API + param, body);
  }

  public addPost(body: any): Observable<any> {
    return this.http.post<any>(POST_API, body).pipe(
      tap(() => {
        this.fetchPosts().subscribe();
      })
    );
  }

  public deletePost(param: any): Observable<any> {
    return this.http.delete<any>(POST_API + param).pipe(
      tap(() => {
        this.fetchPosts().subscribe();
      })
    );
  }

  public addComment(param: any, text: string): Observable<any> {
    return this.http
      .post<any>(POST_API + param, {
        text,
      })
      .pipe(
        tap(() => {
          this.fetchPosts().subscribe();
        })
      );
  }

  public deleteComment(param: any): Observable<any> {
    return this.http.delete<any>(POST_API + 'comments/' + param).pipe(
      tap(() => {
        this.fetchPosts().subscribe();
      })
    );
  }
}
