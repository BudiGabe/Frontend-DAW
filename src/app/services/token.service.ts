import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private jwtHelper: JwtHelperService) { }

  getDecodedToken(token: any) {
    return this.jwtHelper.decodeToken(token);
  }

  getUserId() {
    const decodedToken = this.getDecodedToken(localStorage.getItem('token'));
    return decodedToken.nameid;
  }

  getUserEmail() {
    const decodedToken = this.getDecodedToken(localStorage.getItem('token'));
    return decodedToken.email;
  }

  getUserName() {
    const decodedToken = this.getDecodedToken(localStorage.getItem('token'));
    return decodedToken.unique_name;
  }
}
