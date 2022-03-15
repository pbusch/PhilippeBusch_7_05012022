// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './services/authGuard';
// import { LandingPageComponent } from '../components/landing-page/landing-page.component';
// import { LoginComponent } from '../components/auth/login/login.component';
// import { PostContainerComponent } from '../components/posts/post-container/post-container.component';
// import { ProfileComponent } from '../components/auth/profile/profile.component';
// import { RegisterComponent } from '../components/auth/register/register.component';

// const routes: Routes = [
//   { path: 'signup', component: RegisterComponent },
//   { path: 'login', component: LoginComponent },
//   { path: '', component: LandingPageComponent },
//   {
//     path: 'posts',
//     component: PostContainerComponent,
//     canActivate: [AuthGuard],
//   },
//   { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
// ];
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
