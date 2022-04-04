import { NgModule } from '@angular/core';
import { CommentsComponent } from './comments/comments.component';
import { PostContainerComponent } from './post-container/post-container.component';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { POSTS_ROUTES } from './posts.routes';
import { SharedModule } from 'src/app/shared/shared.module';
//import { PostService } from 'src/app/shared/services/postService';
import { PostIconsComponent } from './post-icons/post-icons.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent } from './emoji/emoji.component';

@NgModule({
  declarations: [
    PostIconsComponent,
    PostListComponent,
    PostComponent,
    CommentsComponent,
    PostDialogComponent,
    PostContainerComponent,
    EmojiComponent,
  ],
  imports: [
    PickerModule,
    ScrollingModule,
    InfiniteScrollModule,
    SharedModule,
    MatStepperModule,
    RouterModule.forChild(POSTS_ROUTES),
  ],
  providers: [],
})
export class PostsModule {}
