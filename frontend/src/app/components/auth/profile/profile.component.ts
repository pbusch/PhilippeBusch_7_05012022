import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/userService';
import { AuthService } from '../../../shared/services/authService';
import { PostService } from 'src/app/shared/services/postService';
import { DataSharingService } from '../../../shared/services/dataSharingService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public userId?: any;
  public userToken?: any;
  public nom?: string;
  public email?: string;
  public totalPosts?: number;
  public totalComments?: number;
  public totalLikes?: number;
  public showPasswordChange: boolean = false;

  public error?: string;
  public valid = false;

  public form: FormGroup = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService,
    private userService: UserService,
    private dataSharingservice: DataSharingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userToken = this.authService.tokenId();

    this.userService.getUser(this.userToken.userId).subscribe({
      next: (res) => {
        this.nom = res.body.name;
        this.userId = res.body.id;
        this.email = res.body.email;
        this.totalPosts = this.userService.userTotalPosts;
        this.totalComments = this.userService.userTotalComments;
        this.totalLikes = this.userService.userTotalLikes;
      },
      error: (error) => {},
      complete: () => {},
    });
  }

  public disconnect() {
    localStorage.removeItem('token');
    this.dataSharingservice.isUserLoggedIn$.next(false);
    this.dataSharingservice.isUserAdmin$.next(false);
    this.router.navigate(['/auth/login']);
  }

  public delete() {
    if (
      confirm(
        'Etes-vous certain(e) de vouloir supprimer votre compte ? Toutes vos données seront perdues !'
      )
    ) {
      this.userService.delUser(this.userToken.userId).subscribe({
        next: (res) => {
          this.nom = res.name;
          this.email = res.email;
        },
        error: (error) => {},
        complete: () => {
          localStorage.removeItem('token');
          this.dataSharingservice.isUserLoggedIn$.next(false);
          this.dataSharingservice.isUserAdmin$.next(false);
          this.router?.navigate(['/auth/signup']);
        },
      });
    } else {
      return;
    }
  }

  public changePassword() {
    this.showPasswordChange = !this.showPasswordChange;
  }

  public postsByUser() {
    this.postService.creator = this.userToken.userId;
    this.postService.offset = 0;
    this.router?.navigate(['posts']);
  }

  public submit() {
    if (this.form.valid) {
      this.error = '';
      this.userService
        .updateUser(
          this.userToken.userId,
          this.form.controls.oldPassword.value,
          this.form.controls.newPassword.value,
          this.nom,
          this.userToken.level,
          this.email
        )
        .subscribe({
          next: () => {},
          error: (error) => {
            console.log(error.error);
            this.error = error.error.error;
          },

          complete: () => {
            this.valid = true;
            localStorage.removeItem('token');
            this.dataSharingservice.isUserLoggedIn$.next(false);
            setTimeout(() => this.router?.navigate(['auth', 'login']), 2500);
          },
        });
    }
  }
}
