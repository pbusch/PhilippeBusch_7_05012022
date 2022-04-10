import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Routes avec "lasy-loading" (chargement différé)

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
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
