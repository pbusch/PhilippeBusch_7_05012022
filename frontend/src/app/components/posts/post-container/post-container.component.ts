import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Post } from '../../../shared/interfaces/post';
import { PostService } from '../../../shared/services/postService';
//import { TimerService } from '../../../shared/services/timerService';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
})
export class PostContainerComponent implements OnInit {
  public posts$: Observable<Post[]> = this.postService.posts$;
  public creator: any;
  //public posts!: Post[];

  // subscription!: Subscription;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // console.log(this.postService.posts$.value.length == 0);
    // if (this.postService.posts$.value.length == 0) {
    //   this.postService.fetchPosts().subscribe();
    // }

    // this.subscription = timer(0, 60000000)
    //   //.pipe(switchMap(() => this.postService.fetchPosts()))
    //   .subscribe(() => this.postService.fetchPartialPosts(0, 2));
    //this.postService.posts$.next([]);

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.postService.creator = paramMap.get('id') || '0';
      this.creator = paramMap.get('id') || '0';
    });

    this.postService.page = 1;
    this.postService.offset = 0;
    //this.postService.creator = 0;
    this.postService.fetchPartialPosts(0, 2, this.postService.creator);
    console.log(this.posts$);
    console.log('initial creator ' + this.creator);
    // this.postService.fetchPosts().subscribe();
    // this.timerService.startWatching(4).subscribe((isTimeOut: boolean) => {
    //   if (isTimeOut) {
    //     this.postService.fetchPosts().subscribe();
    //   }
    // });
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
