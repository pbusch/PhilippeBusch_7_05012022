import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../../shared/services/postService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces/post';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() post?: Post;
  @Input() userToken?: any;

  public firstLetter: string = '';

  public commentsLoaded = true;
  public commentsShow = true;

  public form: FormGroup = this.fb.group({
    commentText: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  public showComments() {
    this.commentsShow = !this.commentsShow;
  }

  public doDelete(commentId: any) {
    this.postService.deleteComment(commentId).subscribe({
      next: () => {},
      error: (error) => {
        console.log(error.error);
      },
      complete: () => {},
    });
  }

  public submit() {
    this.postService
      .addComment(this.post?.id, this.form.controls.commentText.value)
      .subscribe({
        next: () => {},
        error: (error) => {
          console.log(error.error);
        },
        complete: () => {},
      });
  }
}
