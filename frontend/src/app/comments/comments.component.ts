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
    this.postService.getPostComments(this.post.id).subscribe({
      next: (res) => {
        this.comments = res;
      },
      error: () => console.log('erreur'),
      complete: () => console.log(this.comments),
    });
  }

  public showComments() {
    console.log(this.post);
    if (this.commentsShow) {
      this.commentsShow = false;
    } else {
      this.commentsShow = true;
    }
  }

  public submit() {
    console.log('go');
    this.postService
      .addComment(this.post.id, this.form.controls.commentText.value)
      .subscribe({
        next: () => console.log('ok'),
        error: (error) => {
          console.log(error.error);
        },
        complete: () => {
          this.ngOnInit();
          // let currentUrl = this.router.url;
          // this.router
          //   .navigateByUrl('/', { skipLocationChange: true })
          //   .then(() => {
          //     this.router.navigate([currentUrl]);
          //   });
        },
        // this.router?.navigate(['posts']).then(() => {
        //   window.location.reload();
        // }),
      });
  }
}
