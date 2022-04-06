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
  //@Output ("onReset") onReset: EventEmitter = new EventEmitter();

  public userToken?: any;
  public onEdit = false;
  public postHide: boolean = false;

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
    this.postService.creator = this.post?.creator.id;
    this.postService.page = 1;
    this.postService.fetchPartialPosts(0, 2, this.postService.creator);
    window.scrollTo(0, 0);
    this.router?.navigate(['posts', this.post?.creator.id]);
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   window.scrollTo(0, 0);
    //   this.router.navigate(['posts']);
    // });
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
