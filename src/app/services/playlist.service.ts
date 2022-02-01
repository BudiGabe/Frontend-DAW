import { Injectable } from '@angular/core';
import { TokenService } from "./token.service";
import { Song } from "./song.service";

export interface Playlist {
  id: number;
  name: string;
  playlistSongs: Song[];
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl = 'https://localhost:5001/api/playlist';
  private token = localStorage.getItem('token');
  private userId = this.tokenService.getUserId();

  constructor(
    private tokenService: TokenService
  ) { }

  async getPlaylistsOfUser(): Promise<Playlist[]> {
    return await fetch(`${this.apiUrl}/user/${this.userId}`, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    }).then(res => res.json());
  }

  async createPlaylist(name: string) {
    await fetch(`${this.apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      },
      body: JSON.stringify({
        name: name,
        userId: this.userId
      })
    })
  }

  async addSongToPlaylist(playlistId: number, songId: number) {
    await fetch(`${this.apiUrl}/${playlistId}/${songId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    })
  }
}
