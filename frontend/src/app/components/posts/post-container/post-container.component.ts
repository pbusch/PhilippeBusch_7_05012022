import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../shared/interfaces/post';
import { PostService } from '../../../shared/services/postService';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
})
export class PostContainerComponent implements OnInit {
  // Initialisation du flux de Posts
  public posts$: Observable<Post[]> = this.postService.posts$;
  public creator?: string;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.creator = params.creator;
      this.postService.fetchPartialPosts(0, 2, this.creator);
    });

    this.postService.page = 1;
  }
}
