import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Post } from '../../../shared/interfaces/post';
import { postService } from '../../../shared/services/postService';
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
    private postService: postService //private timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.subscription = timer(0, 60000)
      .pipe(switchMap(() => this.postService.fetchPosts()))
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
