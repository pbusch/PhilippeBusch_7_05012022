import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../interfaces/post';
import { Comment } from '../interfaces/comment';
import { postService } from '../services/postService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() post!: Post;
  @Input() getId!: any;
  public comments!: [Comment];

  public commentsShow = false;
  public form: FormGroup = this.fb.group({
    commentText: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private postService: postService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // (this.comments = [
    //   {
    //     userId: '',
    //     commentText: '',
    //     user: { name: '' },
    //     createdAt: new Date(0),
    //     id: '',
    //   },
    // ]),
    this.postService.getPostComments(this.post.id).subscribe({
      next: (res) => {
        this.comments = res;
      },
      error: () => console.log('erreur'),
      complete: () => {
        console.log('comments récupérés');
      },
    });
  }

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
      complete: () => {
        this.ngOnInit();
      },
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
        complete: () => {
          this.ngOnInit();
        },
      });
  }
}
