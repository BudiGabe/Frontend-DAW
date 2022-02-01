import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authApi = 'https://localhost:5001/api/account'

  constructor(private router: Router) { }

  async register(name: string, email: string, pass: string) {
    const userCredentials = {
      name: name,
      email: email,
      password: pass
    }

    await fetch(`${this.authApi}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials),
    }).then(response => {
      if (response.ok) {
        this.login(email, pass);
      }
    });
  }

  async login(email: string, pass: string) {
    const userCredentials = {
      email: email,
      password: pass
    }
    const response = await fetch(`${this.authApi}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials),
    }).then(response => response.json());


    localStorage.setItem('token', response.token);
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // !! = cast to bool and keep the same value
    return !!localStorage.getItem('token');
  }
}
