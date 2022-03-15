import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/authGuard';
import { PostContainerComponent } from './post-container/post-container.component';

export const POSTS_ROUTES: Routes = [
  {
    path: 'posts',
    component: PostContainerComponent,
    canActivate: [AuthGuard],
  },
];
