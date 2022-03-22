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
  public getId?: any;
  public onEdit = false;

  public commentsShow!: boolean;
  public form: FormGroup = this.fb.group({
    commentText: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getId = this.authService.tokenId();
    this.commentsShow = false;
  }

  public doEdit() {
    this.onEdit = true;
  }

  // public isOwner() {
  //   const owner = {
  //     creatorId: 1,
  //   };
  //   this.post.likes.indexOf(owner);
  // }

  public doLike() {
    console.log(this.post?.likes);
    this.postService.likePost(this.post?.id, '').subscribe({
      next: (res) => {
        this.post = res;
      },
      error: (error) => {
        console.log(error.error);
      },
      complete: () => {},
    });
  }

  public isLikedByUser() {
    return this.post?.likes.some(
      (like) => like.creatorId === this.getId.userId
    );
  }

  public doDelete() {
    this.postService.deletePost(this.post?.id).subscribe({
      next: (res) => {
        this.post = res;
      },
      error: (error) => {
        console.log(error.error);
      },
      complete: () => {},
    });
  }
}
