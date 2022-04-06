import { Component, OnInit, Input, Output } from '@angular/core';
import { PostService } from '../../../shared/services/postService';
import { Post } from 'src/app/shared/interfaces/post';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      transition('normal <=> validated', animate(700)),
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
  @Output() private deleteP: EventEmitter<any> = new EventEmitter();
  public state: string = '';

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.isLikedByUser()) {
      this.state = 'validated';
    } else {
      this.state = 'normal';
    }
  }

  public doLike() {
    this.postService.likePost(this.post?.id, '').subscribe({
      next: (res) => {
        this.post = res;
        if (this.isLikedByUser()) {
          this.state = 'validated';
        } else {
          this.state = 'normal';
        }
      },
      error: (error) => {
        console.log(error.error);
        alert(
          "Une erreur s'est produite. Modification impossible pour le moment"
        );
      },
      complete: () => {},
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

  public delete() {
    if (confirm('Etes-vous certain(e) de vouloir supprimer ce Post ?')) {
      this.openSnack('Post supprimé');
      this.deleteP.emit(this.post?.id);
    }
  }

  openSnack(message: any) {
    const ref = this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
