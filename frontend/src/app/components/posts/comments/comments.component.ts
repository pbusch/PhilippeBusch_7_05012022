import { Component, OnInit, Input } from '@angular/core';
import { postService } from '../../../shared/services/postService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces/post';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() post?: any;
  @Input() getId!: any;

  public commentsLoaded = true;
  public commentsShow = true;

  public form: FormGroup = this.fb.group({
    commentText: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private postService: postService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  public showComments() {
    if (this.commentsShow) {
      this.commentsShow = false;
    } else {
      this.commentsShow = true;
    }
  }

  public doDelete(commentId: any) {
    this.postService.deleteComment(commentId).subscribe({
      next: () => console.log('ok'),
      error: (error) => {
        console.log(error.error);
      },
      complete: () => {},
    });
  }

  public submit() {
    this.postService
      .addComment(this.post.id, this.form.controls.commentText.value)
      .subscribe({
        next: () => console.log('ok'),
        error: (error) => {
          console.log(error.error);
        },
        complete: () => {},
      });
  }
}
