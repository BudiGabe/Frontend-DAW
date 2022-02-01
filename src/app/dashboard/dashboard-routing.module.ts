import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LayoutComponent} from "./layout/layout.component";
import {AuthGuard} from "../guards/auth.guard";
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: SearchComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
