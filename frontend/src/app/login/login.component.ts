import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

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
    private router: Router
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
            console.log(res);
            localStorage.setItem('token', res['token']);
          },
          error: (err: { error: string }) =>
            (this.error = 'Mauvais identifiants'),
          complete: () => this.router?.navigate(['profile']),
        });
    }
  }
}
