import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../shared/services/dataSharingService';
import { PostService } from '../../shared/services/postService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn?: boolean;
  authService: any;
  constructor(
    private dataSharingService: DataSharingService,
    private postService: PostService
  ) {
    this.dataSharingService.isUserLoggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.dataSharingService.isUserLoggedIn$.next(true);
    }
  }
  public onReset() {
    // this.postService.posts$.next([]);
    // console.log(this.postService.posts$.value);
  }
}
