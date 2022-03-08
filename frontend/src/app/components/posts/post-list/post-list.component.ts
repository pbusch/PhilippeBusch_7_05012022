import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../shared/interfaces/post';
//import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { Router } from '@angular/router';
//import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @Input() public posts: Post[] | null = null;

  constructor(public router: Router) {}

  ngOnInit(): void {}
}
