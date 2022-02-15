import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../interfaces/post';
import { postService } from '../services/postService';
import { JwtService } from '../services/JwtService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  posts!: [Post];
  public userToken?: any;
  public getId?: any;

  constructor(
    private postService: postService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userToken = localStorage.getItem('token');
    console.log(this.jwtService.DecodeToken(this.userToken));
    this.getId = this.jwtService.DecodeToken(this.userToken);
  }

  public doEdit() {
    this.router.navigateByUrl('edit?id=' + this.post.id);
  }
}
