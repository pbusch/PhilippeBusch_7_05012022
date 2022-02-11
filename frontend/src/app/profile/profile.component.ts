import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService';
import { JwtService } from '../services/JwtService';
import { DataSharingService } from '../services/dataSharingService';
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
    private jwtService: JwtService,
    private userService: UserService,
    private dataSharingservice: DataSharingService,
    private router: Router
  ) {}

  deconnect() {
    localStorage.removeItem('token');
    this.dataSharingservice.isUserLoggedIn.next(false);
    this.router?.navigate(['login']);
  }

  ngOnInit(): void {
    this.userToken = localStorage.getItem('token');
    console.log(this.jwtService.DecodeToken(this.userToken));
    this.getId = this.jwtService.DecodeToken(this.userToken);
    console.log(this.getId.userId);

    this.userService.getUser(this.getId.userId).subscribe({
      next: (res) => {
        this.nom = res.name;
        this.email = res.email;
      },
      error: (error) => {
        console.log(error.error);
      },
      complete: () => console.log('okay'),
    });
  }
}
