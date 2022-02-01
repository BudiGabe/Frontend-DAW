import { Injectable } from '@angular/core';
import { TokenService } from "./token.service";
import { UserService } from "./user.service";

export interface Song {
  songId: number,
  name: string,
  popularity: number
}

@Injectable({
  providedIn: 'root'
})

export class SongService {
  private apiUrl = 'https://localhost:5001/api/song';
  private token = localStorage.getItem('token');
  private userId = this.tokenService.getUserId();

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {
  }

  async searchSong(name: string) {
    const song: Song = await this.getSong(name)
      .catch(() => ({
        songId: -1,
        name: '',
        popularity: -1
      }));

    if (song.songId == -1) {
      const newSong = await this.createSong(name, 1);
      await this.userService.attachSongToUser(newSong.songId);
    } else {
      let songs: Song[] = await this.getSongsOfUser();
      await this.updateSong(song.songId);

      if (!this.songAlreadyInArr(songs, song.songId)) {

        await this.userService.attachSongToUser(song.songId);
      }
    }
  }

  async getSong(name: string): Promise<Song> {
    return await fetch(`${this.apiUrl}/name/${name}`, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    }).then(response => response.json());
  }

  async createSong(name: string, popularity: number) {
    return await fetch(`${this.apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      },
      body: JSON.stringify({
        name: name,
        popularity: popularity
      })
    }).then(res => res.json())
  }

  async updateSong(songId: number) {
    await fetch(`${this.apiUrl}/${songId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    })
  }

  async getSongsOfUser() {
    return await fetch(`${this.apiUrl}/user/${this.userId}`, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    }).then(res => res.json());
  }

  songAlreadyInArr(songs: Song[], id: number): boolean {
    return songs.map((song: Song) => song.songId).indexOf(id) != -1;
  }

  async getSongsOfPlaylist(id: number) {
    return await fetch(`${this.apiUrl}/playlist/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    }).then(res => res.json());
  }

  async deleteSong(id: number) {
    await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    })
  }
}
