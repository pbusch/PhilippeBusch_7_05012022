import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/authService';

@Injectable({ providedIn: 'root' })
export class DataSharingService implements OnInit {
  public isUserLoggedIn$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public isUserAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public userToken?: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isUserLoggedIn$.next(true);
    }
  }
}
