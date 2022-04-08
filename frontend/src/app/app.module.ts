import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthGuard } from './shared/services/authGuard';
import { DataSharingService } from './shared/services/dataSharingService';
import { authInterceptorProviders } from './shared/services/authInterceptor';
import { MatIconModule } from '@angular/material/icon';
import { APP_ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { PostService } from 'src/app/shared/services/postService';
import 'hammerjs';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    //RouterModule.forRoot(APP_ROUTES, { onSameUrlNavigation: 'reload' }),
    RouterModule.forRoot(APP_ROUTES),
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [
    AuthGuard,
    DataSharingService,
    authInterceptorProviders,
    PostService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
