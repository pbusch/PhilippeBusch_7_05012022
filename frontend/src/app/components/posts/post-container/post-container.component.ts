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
  public posts$: Observable<Post[]> = this.postService.posts$;
  public creator: any;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.postService.creator = paramMap.get('id') || '0';
      this.creator = paramMap.get('id') || '0';
    });

    this.postService.page = 1;
    this.postService.offset = 0;
    this.postService.fetchPartialPosts(0, 2, this.postService.creator);
  }
}
