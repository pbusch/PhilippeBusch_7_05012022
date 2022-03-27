import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../shared/interfaces/post';
import { PostService } from '../../../shared/services/postService';
import { AuthService } from 'src/app/shared/services/authService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public submit() {
    console.log(this.post?.id, this.form.controls.newTitle.value);
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

  // public isOwner() {
  //   const owner = {
  //     creatorId: 1,
  //   };
  //   this.post.likes.indexOf(owner);
  // }

  public doDelete() {
    this.postService.deletePost(this.post?.id).subscribe({
      next: () => {},
      error: (error) => {
        console.log(error.error);
        alert('Supression impossible');
      },
      complete: () => {},
    });
  }
}
