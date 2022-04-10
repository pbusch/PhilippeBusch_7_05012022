import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

const AUTH_API = 'http://localhost:3000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Authentification (body : email, password)
  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(AUTH_API + 'login', {
      email,
      password,
    });
  }

  // Inscription (body : name, email, password)
  public signup(
    name: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post<any>(AUTH_API + 'signup', {
      name,
      email,
      password,
    });
  }

  // Déconnexion - Supression du Token
  public signOut() {
    localStorage.removeItem('token');
  }

  public loggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  // Récupération des informations du Token
  public tokenId() {
    let creds: any;
    let token: any;
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
      creds = jwt_decode(token);
      return creds;
    } else {
      return;
    }
  }
}
