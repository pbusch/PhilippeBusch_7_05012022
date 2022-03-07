import { Component } from '@angular/core';
import { DataSharingService } from '../../shared/services/dataSharingService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn?: boolean;
  public isToken?: boolean;
  authService: any;
  constructor(private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }
}
