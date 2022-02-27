import { Component, OnInit } from '@angular/core';
import { Post } from '../../../shared/interfaces/post';
import { postService } from '../../../shared/services/postService';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit {
  public post!: Post;
  public param!: any;
  public file!: File;
  public form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    imgUrl: [''],
  });
  public error?: string;
  public title = 'fileUpload';
  public images: any;

  constructor(
    public postService: postService,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    // this.post = {
    //   userId: '',
    //   title: '',
    //   imgUrl: '',
    //   createdAt: new Date(0),
    //   creator: {
    //     name: '',
    //   },
    // };
    this.route.queryParams.subscribe((params) => {
      this.param = params.id;
    });

    if (this.param == 'new') {
    } else {
      this.postService.getOnePost(this.param).subscribe({
        next: (res) => {
          this.post = res;
          console.log(this.post);
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
      let formData: FormData = new FormData();
      formData.append('image', this.file, this.file.name);
      formData.append('title', this.form.value.title);

      this.postService.addPost(formData).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: () => (this.error = 'Identifiants incorrects'),
        complete: () => this.router?.navigate(['posts']),
      });
    } else {
      let formData: FormData = new FormData();

      formData.append('image', this.file, this.file.name);

      formData.append('title', this.form.value.title);
      console.log(formData);
      this.postService.updatePost(this.param, formData).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: () => (this.error = 'Identifiants incorrects'),
        complete: () => this.router?.navigate(['posts']),
      });
    }
  }

  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }
}
