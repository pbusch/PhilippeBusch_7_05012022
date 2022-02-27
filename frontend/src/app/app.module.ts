import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AppRoutingModule } from 'src/app/shared/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './shared/services/authGuard';
import { JwtService } from './shared/services/jwtService';
import { DataSharingService } from './shared/services/dataSharingService';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { PostComponent } from './components/posts/post/post.component';
import { authInterceptorProviders } from './shared/services/authInterceptor';
import { PostEditComponent } from './components/posts/post-edit/post-edit.component';
import { MatIconModule } from '@angular/material/icon';
import { CommentsComponent } from './components/posts/comments/comments.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { PostDialogComponent } from './components/posts/post-dialog/post-dialog.component';
import { PostContainerComponent } from './components/posts/post-container/post-container.component';

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
    PostContainerComponent,
  ],
  imports: [
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
