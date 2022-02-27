import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../shared/services/dataSharingService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn?: boolean;
  public isToken?: boolean;
  authService: any;
  constructor(private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.dataSharingService.isUserLoggedIn.next(true);
    }
  }
}
