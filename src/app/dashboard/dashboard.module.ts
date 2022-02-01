import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { SearchComponent } from "./search/search.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { TrackItemComponent } from './track-item/track-item.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    LayoutComponent,
    SearchComponent,
    TrackItemComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule
    ],
  providers: [{provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService],
})
export class DashboardModule {
}
