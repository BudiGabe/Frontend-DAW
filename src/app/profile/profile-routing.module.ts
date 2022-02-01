import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "../guards/auth.guard";
import { InfoComponent } from "./info/info.component";
import { SongsComponent } from "./songs/songs.component";
import { PlaylistsComponent } from "./playlists/playlists.component";
import { PlaylistSongsComponent } from "./playlist-songs/playlist-songs.component";

const routes: Routes = [
  {
    path: 'profile',
    component: InfoComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'songs', component: SongsComponent},
      {path: 'playlists', component: PlaylistsComponent},
      {path: 'playlists/:id', component: PlaylistSongsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
