import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { postService } from '../services/postService';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts!: [Post];
  panelOpenState = false;

  constructor(private postService: postService) {}

  ngOnInit(): void {
    this.postService.listPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.posts = res;
        console.log(this.posts);
      },
      error: () => console.log('erreur'),
      complete: () => console.log('okay'),
    });
  }
}
