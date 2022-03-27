import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../../shared/services/postService';
import { Post } from 'src/app/shared/interfaces/post';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-post-icons',
  templateUrl: './post-icons.component.html',
  styleUrls: ['./post-icons.component.scss'],
  animations: [
    trigger('heartFull', [
      state(
        'normal',
        style({
          color: 'black',
        })
      ),
      state(
        'validated',
        style({
          color: 'red',
        })
      ),
      transition('* => validated', animate(700)),
    ]),
    trigger('heartEmpty', [
      state(
        'normal',
        style({
          color: 'red',
        })
      ),
      state(
        'validated',
        style({
          color: 'black',
        })
      ),
      transition('* => validated', animate(700)),
    ]),
  ],
})
export class PostIconsComponent implements OnInit {
  @Input() post?: Post;
  @Input() userToken?: any;
  public state = 'validated';

  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  public doLike() {
    this.postService.likePost(this.post?.id, '').subscribe({
      next: (res) => {
        this.post = res;
        //this.state = 'validated';
      },
      error: (error) => {
        console.log(error.error);
        alert(
          "Une erreur s'est produite. Modification impossible pour le moment"
        );
      },
      complete: () => {
        //this.postService.fetchOnePost(this.post?.id).subscribe();
      },
    });
  }

  public isLikedByUser() {
    return this.post?.likes?.some(
      (like) => like?.creator.id === this.userToken.userId
    );
  }

  public likers(): string {
    return this.post?.likes.map((a) => a.creator.name).join('\n') || '';
  }

  public doDelete() {
    this.postService.deletePost(this.post?.id).subscribe({
      next: () => {
        this.post = undefined;
      },
      error: (error) => {
        console.log(error.error);
        alert(error.error.message);
      },
      complete: () => {},
    });
  }
}
