import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const APP_ROUTES: Routes = [
  { path: '', component: LandingPageComponent },

  {
    path: 'posts',
    loadChildren: () =>
      import('./components/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
  },
];