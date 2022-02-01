import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1'
  private authUrl = 'https://accounts.spotify.com/api/token';
  private clientId = 'dec00cd3f6f74204acfb524a05053cfd';
  private clientSecret = 'e226346a1d4447e9a63ed1146204be6c';
  token = '';

  constructor() { }

  async searchSongs(songQuery: string) {
    return await fetch(`${this.apiUrl}/search?q=${songQuery}&type=track&limit=10`, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    }).then(res => res.json())
  }

  async getToken() {
    return await fetch(`${this.authUrl}`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (btoa(this.clientId + ':' + this.clientSecret))
      }
    }).then(res => res.json())
  }
}
