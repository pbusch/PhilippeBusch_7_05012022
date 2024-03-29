import { Component, OnInit, Input } from '@angular/core';
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
    newTitle: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(20)],
    ],
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

  public top() {
    window.scrollTo(0, 0);
  }

  public doEdit() {
    this.onEdit = true;
  }

  public postsByUser() {
    window.scrollTo(0, 0);
    this.postService.page = 1;

    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['posts'], {
          queryParams: { creator: this.post?.creator.id },
        });
      });
  }

  // Modification du nom du Post
  public submit() {
    if (this.form.valid) {
      this.postService
        .updatePost(this.post?.id, this.form.controls.newTitle.value)
        .subscribe({
          next: (res) => {
            this.post = res;
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
  }

  // Supression du Post via output du composant enfant (post-actions)
  public doDelete(data: any) {
    this.postService.deletePost(this.post?.id).subscribe({
      next: () => {
        this.post = undefined;
      },
      error: (error) => {
        console.log(error.error);
        alert('Supression impossible');
      },
      complete: () => {
        this.postService.page = 1;
        window.scrollTo(0, 0);
        this.router
          .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['posts']);
          });
      },
    });
  }
}
