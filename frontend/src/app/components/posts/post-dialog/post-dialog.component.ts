import { Component, OnInit } from '@angular/core';
import { Post } from '../../../shared/interfaces/post';
import { PostService } from '../../../shared/services/postService';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MatStepper } from '@angular/material/stepper';

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

  stepper: any;
  //imageSrc: string = '';
  imageSrc: any;

  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    public router: Router,
    private dialogRef: MatDialog,
    private sanatizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  public submit() {
    console.log(this.form.value);

    let formData: FormData = new FormData();
    formData.append('image', this.file, this.file.name);
    formData.append('title', this.firstFormGroup.value.firstCtrl);

    this.postService.addPost(formData).subscribe({
      next: () => {},
      error: () => (this.error = 'erreur'),
      complete: () => {},
    });
  }

  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
      if (this.file) {
        this.imageSrc = this.sanatizer.bypassSecurityTrustUrl(
          URL.createObjectURL(this.file)
        );
      }
    }
  }
}
