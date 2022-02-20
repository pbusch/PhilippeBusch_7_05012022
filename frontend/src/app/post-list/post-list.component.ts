import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { PostComponent } from '../post/post.component';
import { postService } from '../services/postService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts!: [Post];

  constructor(private postService: postService, public router: Router) {}

  ngOnInit(): void {
    this.postService.listPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.posts = res;
        //console.log(this.posts);
      },
      error: () => console.log('erreur'),
      complete: () => console.log('okay'),
    });
  }

  public doAdd() {
    this.router.navigateByUrl('edit?id=new');
  }
}
