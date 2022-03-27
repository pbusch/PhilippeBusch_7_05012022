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
  public commentsShow = false;

  public form: FormGroup = this.fb.group({
    //commentText: ['', Validators.required],
    commentText: [''],
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

  public doDelete(commentId: any, postId: any) {
    this.postService.deleteComment(commentId, postId).subscribe({
      next: (res) => {
        this.post = res;
        console.log(res);
      },
      error: (error) => {
        console.log(error.error);
        alert('Commentaires indisponibles pour le moment');
      },
      complete: () => {},
    });
  }

  public submit() {
    this.postService
      .addComment(this.post?.id, this.form.controls.commentText.value)
      .subscribe({
        next: (res) => {
          this.post = res;
        },
        error: (error) => {
          console.log(error.error);
          alert('Commentaires indisponibles pour le moment');
        },
        complete: () => {
          this.form.controls.commentText.setValue(null);
        },
      });
  }
}
