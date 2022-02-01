import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnnouncerService {
  private playlistCreatedSource = new Subject<string>();

  playlistCreated$ = this.playlistCreatedSource.asObservable();

  announcePlaylistCreation(playlist: string) {
    this.playlistCreatedSource.next(playlist);
  }
}
