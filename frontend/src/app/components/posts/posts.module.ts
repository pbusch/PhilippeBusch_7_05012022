import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments/comments.component';
// import { SplitPipe } from './comments/firstChar.pipe';
import { PostContainerComponent } from './post-container/post-container.component';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
// import { HttpClientModule } from '@angular/common/http';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MatBadgeModule } from '@angular/material/badge';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { POSTS_ROUTES } from './posts.routes';
import { SharedModule } from 'src/app/shared/shared.module';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AppRoutingModule } from 'src/app/shared/app-routing.module';

@NgModule({
  declarations: [
    PostListComponent,
    PostComponent,
    CommentsComponent,
    PostDialogComponent,
    PostContainerComponent,
    //SplitPipe,
  ],
  imports: [
    SharedModule,
    //CommonModule,
    //AppRoutingModule,
    //ReactiveFormsModule,
    //BrowserAnimationsModule,
    //HttpClientModule,
    //MatToolbarModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatCardModule,
    // MatButtonModule,
    // FormsModule,
    // MatIconModule,
    // MatBadgeModule,
    // MatDialogModule,
    MatStepperModule,
    RouterModule.forChild(POSTS_ROUTES),
  ],
})
export class PostsModule {}
