import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', Validators.required],
  });
  public error?: string;
  public valid = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public submit() {
    if (this.form.valid) {
      this.authService
        .signup(
          this.form.controls.name.value,
          this.form.controls.email.value,
          this.form.controls.password.value
        )
        .subscribe({
          next: () => {},
          error: (error) => {
            console.log(error.error);
            if (error.error.message) {
              this.error = 'Adresse mail déjà utilisée';
            } else {
              this.error = error.error.error;
            }
          },

          complete: () => {
            this.valid = true;
            setTimeout(() => this.router?.navigate(['auth', 'login']), 2500);
          },
        });
    }
  }
}
