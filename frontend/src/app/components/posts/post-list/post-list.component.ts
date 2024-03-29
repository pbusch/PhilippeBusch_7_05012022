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

  // Récupération du nom de l'utilisateur / créateur - si vide : créateur = tout le monde
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

  // Gestion du scroll infini (récupération prgressive des Posts avec offset/limit)
  onScroll(): void {
    if (this.postService.page < this.postService.totalPosts) {
      this.postService.fetchPartialPosts(
        ++this.postService.page,
        1,
        this.creator
      );
    }
  }
}
