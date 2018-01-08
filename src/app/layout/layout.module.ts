import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthGuard } from '../auth/auth.guard';
import { LayoutService } from './layout.service';
const routes: Route[] = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    HomeComponent,
    SidebarComponent,
    NavbarComponent
  ],
  exports: [
    SidebarComponent,
    NavbarComponent
  ], providers: [
    LayoutService
  ]
})
export class LayoutModule { }
