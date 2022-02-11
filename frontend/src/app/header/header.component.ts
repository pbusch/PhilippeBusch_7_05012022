import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/dataSharingService';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn?: boolean;
  public isToken?: boolean;
  constructor(private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {}
}
