import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Order, OrderProduct } from '../../app.models';
import { FilteredData, Filter } from '../order';
@Component({
  selector: 'app-order-list-filters',
  templateUrl: './order-list-filters.component.html',
  styleUrls: ['./order-list-filters.component.sass']
})
export class OrderListFiltersComponent implements OnInit {
  @Input() data = new FilteredData<Order>();
  openFilterMenu = false;

  constructor() { }
  @Output() callParent: EventEmitter<String> = new EventEmitter<String>();
  ngOnInit() {
  }

  getOrders(event: any) {
    this.openFilterMenu = false;
    this.callParent.emit();
  }

  // @HostListener('click') onclick() {
  //   this.openFilterMenu = !this.openFilterMenu;
  // }

  filterMenu() {
    this.openFilterMenu = !this.openFilterMenu;
  }

  checkedOrNot(status: number) {
    return this.data.filters.orderStatus.findIndex(x => x === status) > -1;
  }

  addFilter(f: number) {
    const i = this.data.filters.orderStatus.findIndex(x => x === f);
    if (i > -1) {
      this.data.filters.orderStatus.splice(i, 1);
    } else {
      this.data.filters.orderStatus.push(f);
    }
  }
}
