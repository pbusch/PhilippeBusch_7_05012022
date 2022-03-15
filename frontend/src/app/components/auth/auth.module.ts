import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MatBadgeModule } from '@angular/material/badge';
// import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { AppRoutingModule } from 'src/app/shared/app-routing.module';
import { RouterModule } from '@angular/router';
import { AUTH_ROUTES } from './auth.routes';
import { SharedModule } from 'src/app/shared/shared.module';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { AppRoutingModule } from 'src/app/shared/app-routing.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
  ],
  imports: [
    //CommonModule,

    SharedModule,

    RouterModule.forChild(AUTH_ROUTES),
    // AppRoutingModule,
    //ReactiveFormsModule,
    //MatToolbarModule,
    // MatInputModule,
    //MatFormFieldModule,
    //MatCardModule,
    //MatButtonModule,
    //FormsModule,
    //MatIconModule,
    //MatBadgeModule,
    //MatDialogModule,
    //MatStepperModule,
  ],
})
export class AuthModule {}
