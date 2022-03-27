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

  throttle = 200;
  distance = 5;
  page = 1;

  constructor(public router: Router, public postService: PostService) {}

  ngOnInit(): void {}

  onScroll(): void {
    this.postService.fetchPartialPosts(0, ++this.page).subscribe();
    console.log(this.page);
  }
}
