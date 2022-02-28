import { Component, OnInit } from '@angular/core';
import { Post } from '../../../shared/interfaces/post';
import { postService } from '../../../shared/services/postService';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
})
export class PostDialogComponent implements OnInit {
  public post!: Post;
  public file!: File;
  public form: FormGroup = this.fb.group({
    title: ['', Validators.required],
    imgUrl: [''],
  });
  public error?: string;
  public title = 'fileUpload';
  public images: any;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  stepper: any;

  constructor(
    public postService: postService,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    public router: Router,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
  }

  public submit() {
    console.log(this.form.value);

    let formData: FormData = new FormData();
    formData.append('image', this.file, this.file.name);
    formData.append('title', this.firstFormGroup.value.firstCtrl);

    this.postService.addPost(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => (this.error = 'erreur'),
      complete: () => console.log('ok'),
    });
  }

  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }
}
