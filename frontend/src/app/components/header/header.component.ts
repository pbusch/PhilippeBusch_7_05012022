import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../shared/services/dataSharingService';
import { AuthService } from 'src/app/shared/services/authService';

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
    private dataSharingService: DataSharingService,
    private authService: AuthService
  ) {
    this.dataSharingService.isUserLoggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
    this.dataSharingService.isUserAdmin$.subscribe((value) => {
      this.isAdmin = value;
    });
  }

  ngOnInit(): void {
    // Vérification du Token et du level (user ou admin) de l'utilisateur
    if (localStorage.getItem('token')) {
      this.dataSharingService.isUserLoggedIn$.next(true);
    }
    this.userToken = this.authService.tokenId();
    console.log(this.userToken.level);
    if (this.userToken.level == '3') {
      this.dataSharingService.isUserAdmin$.next(true);
    }
  }
}
