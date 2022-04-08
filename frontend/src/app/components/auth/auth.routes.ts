import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authGuard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'signup',
    component: RegisterComponent,
    data: { animation: 'isSignup' },
  },
  { path: 'login', component: LoginComponent, data: { animation: 'isLogin' } },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { animation: 'isProfile' },
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: UsersComponent,
    data: { animation: 'isAdmin' },
    canActivate: [AuthGuard],
  },
];
