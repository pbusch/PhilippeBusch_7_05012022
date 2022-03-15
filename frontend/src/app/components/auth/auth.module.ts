import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AUTH_ROUTES } from './auth.routes';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [LoginComponent, ProfileComponent, RegisterComponent],
  imports: [SharedModule, RouterModule.forChild(AUTH_ROUTES)],
})
export class AuthModule {}
