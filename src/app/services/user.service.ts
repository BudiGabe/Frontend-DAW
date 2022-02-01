import { Injectable } from '@angular/core';
import {TokenService} from "./token.service";

interface UserWithoutInfo {
  name: string;
  email: string;
}

export interface Info {
  age: number;
  sex: string;
}

export interface User extends UserWithoutInfo {
  info: Info;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:5001/api/user';
  private token = localStorage.getItem('token');
  private userId = this.tokenService.getUserId();

  constructor(private tokenService: TokenService) { }

  async attachSongToUser(songId: number) {
    await fetch(`${this.apiUrl}/${this.userId}/${songId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    })
  }

  async getUserInfo(): Promise<Info> {
    const res = await fetch(`${this.apiUrl}/${this.userId}/info`, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    }).then(res => res.json());
    return res.personalInfo
  }

  async updateUserInfo(newAge: number, newSex: string) {
    return await fetch(`${this.apiUrl}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      },
      method: 'PATCH',
      body: JSON.stringify({
        id: this.tokenService.getUserId(),
        personalInfo: {
          age: newAge,
          sex: newSex
        }
      })
    });
  }
}
