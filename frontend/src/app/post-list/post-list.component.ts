import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';

import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { postService } from '../services/postService';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts?: [Post];

  constructor(
    private postService: postService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.postService.listPosts().subscribe({
      next: (res) => {
        this.posts = res;
      },
      error: () => console.log('erreur'),
      complete: () => console.log('ok'),
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '800px',
      data: 'Add Post',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit();
    });
  }
}
