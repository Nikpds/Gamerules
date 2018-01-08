import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Customer } from '../../app.models';
import { LoaderService } from '../../shared/loader.service';
import { CustomerService } from '../customer.service';
import { NotifyService } from '../../shared/notify.service';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.sass']
})
export class CustomerDetailsComponent implements OnInit {
  customer: Customer;
  selected = 0;
  constructor(
    private srv: CustomerService,
    private loader: LoaderService,
    private activeRoute: ActivatedRoute,
    private notify: NotifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((param: Params) => {
      const id = param['id'];
      if (id) {
        this.getCustomer(id);
      } else {
        this.router.navigate(['/customers']);
      }
    });

  }

  getCustomer(id: string) {
    this.loader.show();
    this.srv.getCustomer(id).subscribe(res => {
      this.customer = res;
      this.loader.hide();
    }, error => {
      this.notify.error('Σφάλμα ανάκτησης δεδομένων. Επικοινωνίστε με τον διαχειριστή της εφαρμογής.');
      this.loader.hide();
    });
  }

  selectOrder(i: number) {
    this.selected = i;
  }

  totalProducts(): number {
    let total = 0;
    this.customer.oc_Orders.forEach(x => total = x.order_products.length + total);
    return total;
  }

  totalPayments(): string {
    let total = 0;
    for (let i = 0; i < this.customer.oc_Orders.length; i++) {
      const tempTotal = this.customer.oc_Orders[i].order_products.map(m => m.price);
      total = total + tempTotal.reduce((a, b) => a + b);
    }
    return total.toFixed(2);
  }
}
