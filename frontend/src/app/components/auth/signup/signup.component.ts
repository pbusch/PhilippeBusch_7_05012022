import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/authService';

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
  }

  public submit(): void {
    if (this.form.valid) {
      this.authService
        .signup(
          this.form.controls.name.value,
          this.form.controls.email.value,
          this.form.controls.password.value
        )
        .subscribe((user: User) => console.log(user));
      this.router?.navigate(['login']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
