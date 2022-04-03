import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../shared/interfaces/post';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/postService';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() public posts: Post[] | null = null;
  public isVisible: boolean = false;
  public offset = 0;

  throttle = 0;
  distance = 1.2;
  //page = 2;

  constructor(public router: Router, public postService: PostService) {}

  ngOnInit(): void {}

  public doShow() {
    this.isVisible = !this.isVisible;
  }

  public onReset() {
    this.postService.creator = '0';
    this.postService.page = 1;
    this.postService.posts$.next([]);
    this.postService.fetchPartialPosts(0, 2, this.postService.creator);
  }

  onScroll(): void {
    if (this.postService.page < this.postService.totalPosts) {
      this.postService.fetchPartialPosts(
        ++this.postService.page,
        1,
        this.postService.creator
      );
      console.log(this.postService.page);
      console.log(this.postService.totalPosts);
    }
  }
}
