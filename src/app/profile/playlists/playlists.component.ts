import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PlaylistService, Playlist } from "../../services/playlist.service";
import { FormControl } from "@angular/forms";
import { NavigationEnd, Router } from "@angular/router";
import { AnnouncerService } from "../../services/announcer.service";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  playlistName = new FormControl('');
  mySubscription: any;

  constructor(
    private playlistService: PlaylistService,
    private router: Router,
    private announcerService: AnnouncerService
  ) { }


  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists() {
    this.playlistService.getPlaylistsOfUser().then((res: Playlist[]) => {
      this.playlists = res;
    })

    console.log('got playlists');
  }

  async createPlaylist() {
    await this.playlistService.createPlaylist(this.playlistName.value);
    this.announcerService.announcePlaylistCreation(this.playlistName.value);

    this.ngOnInit();
  }

  seePlaylist(id: number) {
    this.router.navigate([`../profile/playlists/${id}`]);
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
