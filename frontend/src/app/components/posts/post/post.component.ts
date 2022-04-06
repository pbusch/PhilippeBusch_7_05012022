import { Component, OnInit, Input, Output } from '@angular/core';
import { Post } from '../../../shared/interfaces/post';
import { PostService } from '../../../shared/services/postService';
import { AuthService } from 'src/app/shared/services/authService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post?: Post;

  public userToken?: any;
  public onEdit = false;
  public commentsShow!: boolean;
  public form: FormGroup = this.fb.group({
    newTitle: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userToken = this.authService.tokenId();
    this.commentsShow = false;
  }

  public doEdit() {
    this.onEdit = true;
  }

  public postsByUser() {
    this.router?.navigate(['posts', this.post?.creator.id]);
  }

  public submit() {
    this.postService
      .updatePost(this.post?.id, this.form.controls.newTitle.value)
      .subscribe({
        next: (res) => {
          this.post = res;
          console.log(res);
        },
        error: (error) => {
          console.log(error.error);
          alert('Modification impossible pour le moment');
        },
        complete: () => {
          this.onEdit = false;
        },
      });
  }

  public doDelete(data: any) {
    console.log(data);
    this.postService.deletePost(this.post?.id).subscribe({
      next: () => {
        this.post = undefined;
      },
      error: (error) => {
        console.log(error.error);
        alert('Supression impossible');
      },
      complete: () => {},
    });
  }
}
