import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './app/auth.guard';
import { LandingPageComponent } from './app/landing-page/landing-page.component';
import { LoginComponent } from './app/login/login.component';
import { PostListComponent } from './app/post-list/post-list.component';
import { PostEditComponent } from './app/post-edit/post-edit.component';
import { ProfileComponent } from './app/profile/profile.component';
import { RegisterComponent } from './app/register/register.component';

const routes: Routes = [
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingPageComponent },
  { path: 'posts', component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: PostEditComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
