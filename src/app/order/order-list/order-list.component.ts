import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../shared/notify.service';

import { Order, OrderProduct } from '../../app.models';
import { FilteredData, Filter } from '../order';
import { LoaderService } from '../../shared/loader.service';
import { OrderService } from '../order.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnInit {
  data = new FilteredData<Order>();
  selected: string;
  selectedMail: number;
  ordersForGame = new Array<OrderProduct>();
  status = [
    { id: 0, description: 'Reserved' },
    { id: 1, description: 'Ship' },
    { id: 2, description: 'Ordered' },
    { id: 3, description: 'Pegasus' },
    { id: 4, description: 'Playhouse' },
    { id: 5, description: 'Complete' },
    { id: 6, description: 'Wishlist' },
    { id: 7, description: 'Canceled' },
    { id: 8, description: 'Refunded' },
    { id: 9, description: 'Preordered' },
    { id: 10, description: 'Incoming' },
    { id: 11, description: 'Esd' },
    { id: 12, description: 'BNW' },
    { id: 13, description: 'Alliance' },
    { id: 11, description: 'Backorder' },
    { id: 12, description: 'Blackfire' },
    { id: 13, description: 'Kaissa' }
  ];
  constructor(
    private srv: OrderService,
    private notify: NotifyService,
    private loader: LoaderService) { }

  ngOnInit() {
    this.data.filters.sortField = 'date_added';
    this.data.filters.orderStatus.push(5);
    this.getOrders();
  }

  selectProduct(id: string, _id: string) {
    this.selected = (id + '') + _id;
  }

  isSelected(id: string, _id: string) {
    return this.selected === (id + '' + _id);
  }

  saveOrder(o: Order, i: number) {
    this.loader.show();
    this.srv.updateOrder(o).subscribe(res => {
      this.data.data[i] = res;
      this.notify.success('Η παραγγελία αποθηκεύτηκε επιτυχώς.');
      this.loader.hide();
    }, error => {
      this.notify.error('Σφάλμα αποθήκευσης. Επικοινωνίστε με τον διαχειριστή της εφαρμογής.');
      this.loader.hide();
    });
  }

  getOrders() {
    if (this.data.filters.search) {
      this.data.filters.search = this.data.filters.search.trim();
    }
    this.loader.show();
    this.srv.getOrders(this.data.filters).subscribe(res => {
      this.data.data = res;
      this.loader.hide();
    }, error => {
      this.notify.error('Σφάλμα ανάκτησης δεδομένων. Επικοινωνίστε με τον διαχειριστή της εφαρμογής.');
      this.loader.hide();
    });
  }

  emailCopied(i: number) {
    this.selectedMail = i;
    setTimeout(() => {
      this.selectedMail = -1;
    }, 1000);
  }

  convertTotal(t: number) {
    return t.toFixed(2);
  }

  getOrdersOfGame(id: number) {
    this.loader.show();
    this.srv.getOrdersOfGame(id).subscribe(res => {
      this.ordersForGame = res;
      this.loader.hide();
    }, error => {
      this.notify.error('Σφάλμα ανάκτησης δεδομένων. Επικοινωνίστε με τον διαχειριστή της εφαρμογής.');
      this.loader.hide();
    });
  }

  cancelOrder(order: Order, i: number) {
    this.loader.show();
    this.srv.cancelOrder(order).subscribe(res => {
      this.data.data[i] = res;
      this.loader.hide();
      this.notify.success('Η παραγγελία ακυρώθηκε.');
    }, error => {
      this.notify.error('Σφάλμα Ακύρωσης. Επικοινωνίστε με τον διαχειριστή της εφαρμογής.');
      this.loader.hide();
    });
  }

  closeOrders() {
    this.ordersForGame = new Array<OrderProduct>();
  }
}
