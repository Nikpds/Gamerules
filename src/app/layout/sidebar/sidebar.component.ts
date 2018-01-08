import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  navItems = [
    { text: 'Home', hasIcon: 'fa fa-home', isActive: true, link: '/home', subMenu: [] },
    { text: 'Παραγγελίες', hasIcon: 'fa fa-shopping-cart', isActive: false, link: '/orders', subMenu: [] },
    // {text: 'Προιόντα', hasIcon: 'fa fa-user', isActive: false, link: '', subMenu: [
    //   { text: 'Νέο Προιόν', hasIcon: 'fa fa-plus', isActive: false, link: '', subMenu: [] }] },
    { text: 'Πελατολόγιο', hasIcon: 'fa fa-users', isActive: false, link: '/customers', subMenu: [] },
    { text: 'Αποθήκη Προμηθευτών', hasIcon: 'fa fa-archive', isActive: false, link: '', subMenu: [] },
    { text: 'Μηνύματα Email', hasIcon: 'fa fa-envelope', isActive: false, link: '/email/messages', subMenu: [] }
  ];
  minimize = true;
  currentRoute: string;
  constructor(
    private router: Router,
    private location: Location,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (this.location.path() !== '') {
        this.currentRoute = this.location.path();
        this.selectActive();
      } else {
        this.currentRoute = '/home';
        this.selectActive();
      }
    });
  }

  selectMenuItem(i: number) {
    this.router.navigate([this.navItems[i].link]);
  }

  selectActive() {
    this.navItems.forEach(x => { x.isActive = false; x.subMenu.forEach(f => f.isActive = false); });
    const i = this.navItems.findIndex(x => x.link === this.currentRoute);
    if (i < 0) { return; }
    this.navItems[i].isActive = true;
  }

  openClose() {
    this.minimize = !this.minimize;
  }

  logout() {
    this.auth.logout();
  }

}

class NavItem {
  text: string;
  isActive: boolean;
  hasIcon: string;
  link: string;
  subMenu: Array<NavItem>;
}
