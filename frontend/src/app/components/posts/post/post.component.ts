import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../shared/interfaces/post';
import { postService } from '../../../shared/services/postService';
import { AuthService } from 'src/app/shared/services/authService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public commentsShow!: boolean;
  public form: FormGroup = this.fb.group({
    commentText: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private postService: postService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.userToken = localStorage.getItem('token');
    // this.getId = this.jwtService.DecodeToken(this.userToken);
    this.getId = this.authService.tokenId();
    console.log('id du createur ' + this.getId.userId);
    this.commentsShow = false;
  }

  public doEdit() {
    this.router.navigateByUrl('edit?id=' + this.post.id);
  }

  public doDelete() {
    this.postService.deletePost(this.post.id).subscribe({
      next: (res) => {
        this.post = res;
      },
      error: (error) => {
        console.log(error.error);
      },
      complete: () => {
        let currentUrl = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentUrl]);
          });
      },
    });
  }
}
