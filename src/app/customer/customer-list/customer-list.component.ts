import { Component, OnInit } from '@angular/core';

import { Customer } from '../../app.models';
import { LoaderService } from '../../shared/loader.service';
import { CustomerService } from '../customer.service';
import { NotifyService } from '../../shared/notify.service';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.sass']
})
export class CustomerListComponent implements OnInit {
  customers = new Array<Customer>();

  constructor(
    private srv: CustomerService,
    private loader: LoaderService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.loader.show();
    this.srv.getCustomers().subscribe(res => {
      this.customers = res;
      this.loader.hide();
    }, error => {
      this.notify.error('Σφάλμα ανάκτησης δεδομένων. Επικοινωνίστε με τον διαχειριστή της εφαρμογής.');
      this.loader.hide();
    });
  }

}
