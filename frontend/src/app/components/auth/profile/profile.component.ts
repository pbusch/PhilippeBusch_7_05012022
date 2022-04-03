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
  public userToken?: any;
  public getId?: any;
  public nom?: string;
  public email?: string;
  public totalPosts?: number;
  public totalComments?: number;
  public totalLikes?: number;
  public showPasswordChange: boolean = false;
  public showAdminPannel: boolean = false;

  public form: FormGroup = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
  });
  public error?: string;
  public valid = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService,
    private userService: UserService,
    private dataSharingservice: DataSharingService,
    private router: Router
  ) {}

  public deconnect() {
    localStorage.removeItem('token');
    this.dataSharingservice.isUserLoggedIn$.next(false);
    this.router?.navigate(['/auth/login']);
  }

  public delete() {
    if (
      confirm(
        'Etes-vous certain(e) de vouloir supprimer votre compte ? Toutes vos données seront perdues !'
      )
    ) {
      this.userService.delUser(this.getId.userId).subscribe({
        next: (res) => {
          this.nom = res.name;
          this.email = res.email;
        },
        error: (error) => {
          console.log(error.error);
        },
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

  ngOnInit(): void {
    this.getId = this.authService.tokenId();
    console.log(this.getId.level);

    this.userService.getUser(this.getId.userId).subscribe({
      next: (res) => {
        this.nom = res.body.name;
        this.email = res.body.email;
        this.totalPosts = this.userService.userTotalPosts;
        this.totalComments = this.userService.userTotalComments;
        this.totalLikes = this.userService.userTotalLikes;
      },
      error: (error) => {
        console.log(error.error);
      },
      complete: () => {},
    });
  }

  public changePassword() {
    this.showPasswordChange = !this.showPasswordChange;
  }
  public showAdmin() {
    this.showAdminPannel = !this.showAdminPannel;
  }

  public postsByUser() {
    this.postService.creator = this.getId.userId;
    this.router?.navigate(['posts']);
  }

  public submit() {
    if (this.form.valid) {
      this.error = '';
      this.userService
        .updateUser(
          this.getId.userId,
          this.form.controls.oldPassword.value,
          this.form.controls.newPassword.value,
          this.nom,
          this.getId.level,
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
