import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../interfaces/post';
import { postService } from '../services/postService';
import { JwtService } from '../services/JwtService';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  posts!: [Post];
  public userToken?: any;
  public getId?: any;
  public commentsShow!: boolean;
  public form: FormGroup = this.fb.group({
    commentText: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private postService: postService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userToken = localStorage.getItem('token');
    //console.log(this.jwtService.DecodeToken(this.userToken));
    this.getId = this.jwtService.DecodeToken(this.userToken);
    this.commentsShow = false;
  }

  public doEdit() {
    this.router.navigateByUrl('edit?id=' + this.post.id);
  }

  public doDelete() {
    this.postService.deletePost(this.post.id).subscribe({
      next: (res) => {
        this.post = res;
        console.log(this.post);
      },
      error: (error) => {
        console.log(error.error);
      },
      complete: () =>
        this.router?.navigate(['posts']).then(() => {
          window.location.reload();
        }),
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
        complete: () =>
          this.router?.navigate(['posts']).then(() => {
            window.location.reload();
          }),
      });
  }
}
