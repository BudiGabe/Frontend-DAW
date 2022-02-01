import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { ProfileRoutingModule } from "./profile-routing.module";
import { InfoComponent } from "./info/info.component";
import { SongsComponent } from "./songs/songs.component";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { PlaylistsComponent } from './playlists/playlists.component';
import { MatListModule } from "@angular/material/list";
import { PlaylistSongsComponent } from './playlist-songs/playlist-songs.component';
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  declarations: [
    InfoComponent,
    SongsComponent,
    PlaylistsComponent,
    PlaylistSongsComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [{provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService],
})
export class ProfileModule {
}
