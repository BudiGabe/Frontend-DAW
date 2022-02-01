import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PlaylistService } from "../../services/playlist.service";
import {SongService, Song} from "../../services/song.service";

@Component({
  selector: 'app-playlist-songs',
  templateUrl: './playlist-songs.component.html',
  styleUrls: ['./playlist-songs.component.scss']
})
export class PlaylistSongsComponent implements OnInit {
  playlistId: number = -1;
  songs: Song[] = [];

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private songService: SongService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.playlistId = params['id'];
      }
    )
    this.getPlaylistSongs();
  }

  getPlaylistSongs() {
    this.songService.getSongsOfPlaylist(this.playlistId)
      .then(res => {
        this.songs = res;
      })
  }

}
