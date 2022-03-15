import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/userService';
import { AuthService } from '../../../shared/services/authService';
import { DataSharingService } from '../../../shared/services/dataSharingService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public userToken?: any;
  public getId?: any;
  public nom?: string;
  public email?: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dataSharingservice: DataSharingService,
    private router: Router
  ) {}

  deconnect() {
    localStorage.removeItem('token');
    this.dataSharingservice.isUserLoggedIn$.next(false);
    this.router?.navigate(['/auth/login']);
  }

  ngOnInit(): void {
    this.getId = this.authService.tokenId();

    this.userService.getUser(this.getId.userId).subscribe({
      next: (res) => {
        this.nom = res.name;
        this.email = res.email;
      },
      error: (error) => {
        console.log(error.error);
      },
      complete: () => {},
    });
  }
}
