import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../shared/interfaces/post';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/postService';
import { UserService } from 'src/app/shared/services/userService';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() public posts: Post[] | null = null;
  @Input() public creator: any;
  public creatorName: any;
  public isVisible: boolean = false;
  public offset = 0;

  throttle = 0;
  distance = 1.2;
  public author: any;

  constructor(
    public router: Router,
    public postService: PostService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.postService.creator = this.creator;
    if (this.creator != '0') {
      this.userService
        .getUser(this.creator)
        .subscribe((res) => (this.creatorName = res.body.name));
    } else {
      this.creatorName = 'Tous';
    }
  }

  public doShow() {
    this.isVisible = !this.isVisible;
  }

  public onReset() {
    this.router.navigate(['posts']);
  }

  onScroll(): void {
    if (this.postService.page < this.postService.totalPosts) {
      this.postService.fetchPartialPosts(
        ++this.postService.page,
        1,
        this.creator
      );
      console.log(this.postService.page);
      console.log(this.postService.totalPosts);
    }
  }
}
