import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/dataSharingService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  public error?: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {}

  public submit() {
    if (this.form.valid) {
      this.authService
        .login(
          this.form.controls.email.value,
          this.form.controls.password.value
        )
        .subscribe({
          next: (res) => {
            localStorage.setItem('token', res['token']);
            this.dataSharingService.isUserLoggedIn.next(true);
          },
          error: () => (this.error = 'Identifiants incorrects'),
          complete: () => this.router?.navigate(['posts']),
        });
    }
  }
}
