import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../interfaces/post';

const POST_API = 'http://localhost:3000/api/posts/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class PostService {
  public posts$: BehaviorSubject<Post[]> = new BehaviorSubject([] as Post[]);
  public totalPosts: any = 2;
  public page: any = 2;

  constructor(private http: HttpClient) {}

  public fetchPartialPosts(
    offset: number,
    limit: number,
    creator?: string
  ): void {
    let params = new HttpParams().set('limit', limit).set('offset', offset);
    if (creator) {
      params = params.append('creator', creator);
    }
    this.http
      .get<Post[]>(POST_API, {
        params,
        observe: 'response',
      })
      .subscribe((res) => {
        this.totalPosts = res.headers.get('x-total-count');
        if (res.body) {
          if (offset == 0) {
            return this.posts$.next(res.body);
          }
          this.posts$.next(this.posts$.value.concat(res.body));
        }
      });
  }

  public updatePost(param: any, text: string): Observable<any> {
    return this.http
      .put<any>(POST_API + param, {
        text,
      })
      .pipe(tap(() => {}));
  }

  public addPost(body: any): Observable<any> {
    return this.http.post<any>(POST_API, body).pipe(tap(() => {}));
  }

  public deletePost(param: any): Observable<any> {
    return this.http.delete<any>(POST_API + param).pipe(tap(() => {}));
  }

  public addComment(param: any, text: string): Observable<any> {
    return this.http
      .post<any>(POST_API + param, {
        text,
      })
      .pipe(tap(() => {}));
  }

  public deleteComment(param: any, post: any): Observable<any> {
    const newPOST_API = POST_API + 'comments/' + param + '&' + post;
    return this.http.delete<any>(newPOST_API).pipe(tap(() => {}));
  }

  public likePost(param: any, text: string): Observable<any> {
    return this.http
      .post<any>(POST_API + param + '/like', { text })
      .pipe(tap(() => {}));
  }
}
