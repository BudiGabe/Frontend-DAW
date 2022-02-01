import { Component, Input, OnInit } from '@angular/core';
import { SongService } from "../../services/song.service";

@Component({
  selector: 'app-track-item',
  templateUrl: './track-item.component.html',
  styleUrls: ['./track-item.component.scss']
})
export class TrackItemComponent implements OnInit {
  @Input() track: any;
  i: number  = 0;
  constructor(
    private songService: SongService
  ) { }

  ngOnInit(): void { }

  addSong() {
    console.log(this.i++)
    this.songService.searchSong(this.track.name);
  }

}
