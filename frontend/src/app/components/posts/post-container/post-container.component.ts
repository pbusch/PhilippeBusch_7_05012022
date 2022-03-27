import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Post } from '../../../shared/interfaces/post';
import { PostService } from '../../../shared/services/postService';
//import { TimerService } from '../../../shared/services/timerService';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
})
export class PostContainerComponent implements OnInit {
  public posts$: Observable<Post[]> = this.postService.posts$;
  public posts!: Post[];
  subscription!: Subscription;

  constructor(
    private postService: PostService //private timerService: TimerService
  ) {}

  ngOnInit(): void {
    // console.log(this.postService.posts$.value.length == 0);
    // if (this.postService.posts$.value.length == 0) {
    //   this.postService.fetchPosts().subscribe();
    // }
    this.subscription = timer(0, 600000)
      .pipe(switchMap(() => this.postService.fetchPartialPosts(0, 4)))
      .subscribe();

    // this.postService.fetchPosts().subscribe();
    // this.timerService.startWatching(4).subscribe((isTimeOut: boolean) => {
    //   if (isTimeOut) {
    //     this.postService.fetchPosts().subscribe();
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
