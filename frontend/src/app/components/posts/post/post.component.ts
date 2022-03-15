import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../shared/interfaces/post';
import { postService } from '../../../shared/services/postService';
import { AuthService } from 'src/app/shared/services/authService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;

  public userToken?: any;
  public getId?: any;
  public onEdit = false;

  public commentsShow!: boolean;
  public form: FormGroup = this.fb.group({
    commentText: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private postService: postService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getId = this.authService.tokenId();
    this.commentsShow = false;
  }

  public doEdit() {
    this.onEdit = true;
  }

  public doDelete() {
    this.postService.deletePost(this.post.id).subscribe({
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
