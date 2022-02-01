import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import { SpotifyService } from "../services/spotify.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  pass = new FormControl('');
  name = new FormControl('');

  constructor(
    private router: Router,
    private authService: AuthService,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard'])
    }
  }

  login() {
    this.authService.login(this.email.value, this.pass.value);
    this.spotifyService.getToken().then(res => this.spotifyService.token = res.access_token);
  }

  register() {
    this.authService.register(this.name.value, this.email.value, this.pass.value);
    this.spotifyService.getToken().then(res => this.spotifyService.token = res.access_token);
  }
}
