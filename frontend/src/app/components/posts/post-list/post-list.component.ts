import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../shared/interfaces/post';
import { Router } from '@angular/router';

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
