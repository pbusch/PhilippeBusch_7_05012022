import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Router, RouterModule, Routes } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public users?: User[];
  private router?: Router;

  constructor(private authService: AuthService) {}

  public subscription: Subscription = new Subscription();

  public form: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      confirmPassword: new FormControl(''),
    },
    { validators: this.checkPassword() }
  );

  public erreursForm: { [field: string]: string } = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    form: '',
  };

  public messagesErreur: { [field: string]: { [field: string]: string } } = {
    name: {
      required: 'Ce champ est requis.',
      minlength: 'Votre nom doit faire au moins 4 caractères.',
    },
    email: {
      required: 'Entrez un email.',
      email: 'Rentrez une adresse email valide.',
    },
    password: {
      required: 'Ce champ est requis.',
      minlength: 'Mot de passe trop court',
    },
    confirmPassword: {
      confirmPassword: 'Le mot de passe ne correspond pas',
    },
    form: {
      noMatch: 'Les mots de passe ne correspondent pas.',
    },
  };

  checkPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.get('password')!.value !=
        control.get('confirmPassword')!.value
        ? { noMatch: true }
        : null;
    };
  }

  changementStatusForm() {
    if (!this.form) {
      return;
    }
    const form = this.form;
    for (const field in this.erreursForm) {
      this.erreursForm[field] = '';
      let control: AbstractControl;
      if (
        field === 'form' &&
        form.get('password')!.touched &&
        form.get('confirmPassword')!.dirty
      ) {
        control = form;
      } else {
        control = form.get(field)!;
      }
      //if (control && control.touched && control.invalid) {
      if (control && !control.pristine && control.invalid) {
        const messages = this.messagesErreur[field];
        for (const key in control.errors) {
          this.erreursForm[field] += messages[key] + ' ';
        }
      }
    }
  }

  ngOnInit() {
    this.subscription.add(
      this.form.statusChanges.subscribe(() => {
        this.changementStatusForm();
      })
    );

    // this.httpService
    //   .get<User[]>('http://localhost:3000/api/users/')
    //   .subscribe((users) => {
    //     console.log(users);
    //     this.users = users;
    //   });
  }

  public submit(): void {
    // let jsonObj: object;
    // jsonObj = {
    //   name: this.form.controls.name.value,
    //   email: this.form.controls.email.value,
    //   password: this.form.controls.password.value,
    // };
    // console.log(JSON.stringify(jsonObj));
    if (this.form.valid) {
      this.authService
        .signup(
          this.form.controls.name.value,
          this.form.controls.email.value,
          this.form.controls.password.value
        )
        //.subscribe((users) => (this.users = users));
        .subscribe((user: User) => console.log(user));
      this.router?.navigate(['login']);
    }

    // this.httpService
    //   .post<User>('http://localhost:3000/api/auth/signup', jsonObj)
    //   .subscribe((user: User) => console.log(user));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
