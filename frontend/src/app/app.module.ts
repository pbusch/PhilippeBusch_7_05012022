import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from 'src/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { JwtService } from './services/JwtService';
import { DataSharingService } from './services/dataSharingService';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { authInterceptorProviders } from './services/authInterceptor';
import { PostEditComponent } from './post-edit/post-edit.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import { CommentsComponent } from './comments/comments.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { PostDialogComponent } from './post-dialog/post-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    PostListComponent,
    PostComponent,
    PostEditComponent,
    CommentsComponent,
    PostDialogComponent,
  ],
  imports: [
    CdkAccordionModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
  ],
  providers: [
    AuthGuard,
    JwtService,
    DataSharingService,
    authInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
