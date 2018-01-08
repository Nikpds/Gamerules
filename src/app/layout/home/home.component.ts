import { Component, OnInit } from '@angular/core';

import { Counter } from '../../app.models';

import { LayoutService } from '../layout.service';
import { NotifyService } from '../../shared/notify.service';
import { LoaderService } from '../../shared/loader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  counters = new Counter();
  constructor(
    private loader: LoaderService,
    private notify: NotifyService,
    private service: LayoutService
  ) { }

  ngOnInit() {
    this.getCounters();
  }

  getCounters() {
    this.loader.show();
    this.service.getCounters().subscribe(res => {
      this.counters = res;
      console.log(res);
      this.loader.hide();
    }, error => {
      this.notify.error();
      this.loader.hide();
    });
  }

}
