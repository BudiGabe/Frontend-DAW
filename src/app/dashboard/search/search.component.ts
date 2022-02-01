import { Component, OnInit } from '@angular/core';
// import { DogsService, DogResponse } from "../../services/dogs.service";
import { FormControl } from "@angular/forms";
import { SongService } from "../../services/song.service";
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query = new FormControl('');
  tracksList : any[] = [];

  constructor(
    private songService: SongService,
    private spotifyService: SpotifyService
  ) {
  }

  ngOnInit(): void {
  }

  search(query: string) {
    if(query != '') {
      this.spotifyService.searchSongs(query)
        .then(res => this.tracksList = res.tracks.items);
    }

  }
}
