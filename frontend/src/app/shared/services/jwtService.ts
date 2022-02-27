import { Injectable, NgModule } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
@NgModule()
export class JwtService {
  constructor() {}

  DecodeToken(token: string): string {
    return jwt_decode(token);
  }
}
