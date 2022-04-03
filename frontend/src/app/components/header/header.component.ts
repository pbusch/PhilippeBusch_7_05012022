import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../shared/services/dataSharingService';
import { PostService } from '../../shared/services/postService';
import { AuthService } from 'src/app/shared/services/authService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoggedIn?: boolean;
  public isAdmin?: boolean;
  public userToken?: any;

  constructor(
    private router: Router,
    private dataSharingService: DataSharingService,
    private postService: PostService,
    private authService: AuthService
  ) {
    this.dataSharingService.isUserLoggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.dataSharingService.isUserLoggedIn$.next(true);
    }
    this.userToken = this.authService.tokenId();
  }
  public onReset() {
    // this.postService.creator = '0';
    // this.postService.posts$.next([]);
    // this.postService.fetchPartialPosts(0, 2, this.postService.creator);
  }
}
