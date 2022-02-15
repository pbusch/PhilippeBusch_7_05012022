import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { postService } from '../services/postService';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit {
  post!: Post;
  public param!: any;
  public form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    imgUrl: ['', Validators.required],
  });
  public error?: string;

  constructor(
    public postService: postService,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.param = params.id;
    });

    if (this.param == 'new') {
      console.log('new!');
      this.post = {
        userId: '',
        title: '',
        imgUrl: '',
        createdAt: new Date(0),
        user: {
          name: '',
        },
      };
    } else {
      this.postService.getOnePost(this.param).subscribe({
        next: (res) => {
          console.log(res);
          this.post = res;
        },
        error: (error) => {
          console.log(error.error);
        },
        complete: () => console.log('okay'),
      });
    }
  }

  public submit() {
    console.log(this.form.value);

    if (this.param == 'new') {
      this.postService.addPost(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: () => (this.error = 'Identifiants incorrects'),
        complete: () => this.router?.navigate(['posts']),
      });
    } else {
      this.postService.updatePost(this.param, this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: () => (this.error = 'Identifiants incorrects'),
        complete: () => this.router?.navigate(['posts']),
      });
    }
  }
}
