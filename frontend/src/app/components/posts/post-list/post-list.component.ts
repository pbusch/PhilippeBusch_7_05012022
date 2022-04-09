import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Post } from '../../../shared/interfaces/post';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/services/postService';
import { UserService } from 'src/app/shared/services/userService';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnChanges {
  @Input() public posts: Post[] | null = null;
  @Input() public creator?: string;
  public creatorName: any;
  public isVisible: boolean = false;
  public offset = 0;
  public topTitle?: Text;
  public totalPosts?: any;

  throttle = 0;
  distance = 1.2;

  constructor(
    public router: Router,
    public postService: PostService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.creator) {
      this.userService.getUser(this.creator).subscribe((res) => {
        this.creatorName = res.body.name;
        this.totalPosts = this.userService.userTotalPosts;
      });
    } else {
      this.creatorName = 'Tout le monde !';
      this.totalPosts = this.postService.totalPosts;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.creator?.currentValue) {
      this.getCreatorName(changes.creator?.currentValue);
    }
  }

  public getCreatorName(id: any) {
    if (this.creator) {
      this.userService.getUser(id).subscribe((res) => {
        this.creatorName = res.body.name;
        this.totalPosts = this.userService.userTotalPosts;
      });
    } else {
      this.creatorName = 'Tout le monde !';
      this.totalPosts = this.postService.totalPosts;
    }
  }

  public doShow() {
    this.isVisible = !this.isVisible;
  }

  public onReset() {
    this.creatorName = 'Tout le monde !';
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['posts']);
      });
  }

  onScroll(): void {
    if (this.postService.page < this.postService.totalPosts) {
      console.log(this.postService.page);

      this.postService.fetchPartialPosts(
        ++this.postService.page,
        1,
        this.creator
      );
    }
  }
}
