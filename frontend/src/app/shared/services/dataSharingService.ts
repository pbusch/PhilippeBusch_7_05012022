import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService implements OnInit {
  public isUserLoggedIn$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isUserLoggedIn$.next(true);
    }
  }
}
