import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PostContainerComponent } from './components/posts/post-container/post-container.component';
import { AuthGuard } from './shared/services/authGuard';

export const APP_ROUTES: Routes = [
  //   { path: 'signup', component: RegisterComponent },
  //   { path: 'login', component: LoginComponent },
  { path: '', component: LandingPageComponent },
  //   {
  //     path: 'posts',
  //     component: PostContainerComponent,
  //     canActivate: [AuthGuard],
  //   },
  //{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
