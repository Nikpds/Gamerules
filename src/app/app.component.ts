import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy, OnInit {
  private subscriptions = new Array<Subscription>();
  title = 'app';
  loggedIn = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {
    this.subscriptions.push(this.auth.loggedIn$
      .subscribe((login) => {
        this.loggedIn = login;
      }));
  }
}
