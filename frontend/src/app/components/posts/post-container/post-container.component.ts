import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Post } from '../../../shared/interfaces/post';
import { postService } from '../../../shared/services/postService';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
})
export class PostContainerComponent implements OnInit, OnDestroy {
  public posts$: Observable<Post[]> = this.postService.posts$;
  public posts!: Post[];
  subscription!: Subscription;
  statusText!: string;

  constructor(private postService: postService) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // this.postService.fetchPosts().subscribe({
    //   next: (res) => {
    //     this.posts! = res;
    //   },
    //   error: (error) => {
    //     console.log(error.error);
    //   },
    //   complete: () => {},
    // });

    this.subscription = timer(0, 300000)
      .pipe(switchMap(() => this.postService.fetchPosts()))
      .subscribe();
  }
}
