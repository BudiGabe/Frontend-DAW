import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SongService, Song } from "../../services/song.service";
import { MatMenuTrigger } from "@angular/material/menu";
import { PlaylistService, Playlist } from "../../services/playlist.service";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  songs: Song[] = [];
  playlists: Playlist[] = [];
  selectedSongId!: number;
  mySubscription: any;
  menuTopLeftPosition =  {x: 0, y: 0}
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(
    private songService: SongService,
    private playlistService: PlaylistService,
    private router: Router
) { }

  ngOnInit(): void {
    this.getAllUserSongs();
    this.getAllPlaylists();
  }

  getAllUserSongs() {
    this.songService.getSongsOfUser()
      .then(res => {
        this.songs = res;
      })
  }

  getAllPlaylists() {
    this.playlistService.getPlaylistsOfUser()
      .then(res => {
        this.playlists = res;
      })
  }

  onRightClick(event: MouseEvent, songId:number) {
    event.preventDefault();

    this.menuTopLeftPosition.x = event.clientX;
    this.menuTopLeftPosition.y = event.clientY;

    this.selectedSongId = songId;

    this.trigger.openMenu();
  }

  addSongToPlaylist(playlistId: number) {
    this.playlistService.addSongToPlaylist(playlistId, this.selectedSongId);
  }

  async removeSong() {
    await this.songService.deleteSong(this.selectedSongId);

    this.ngOnInit();
  }


  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
