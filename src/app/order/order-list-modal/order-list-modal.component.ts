import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Order, OrderProduct } from '../../app.models';
import { FilteredData, Filter } from '../order';
@Component({
  selector: 'app-order-list-modal',
  templateUrl: './order-list-modal.component.html',
  styleUrls: ['./order-list-modal.component.sass']
})
export class OrderListModalComponent implements OnInit {
  @Input() ordersForGame = new Array<OrderProduct>();
  constructor() { }
  @Output() callParent: EventEmitter<String> = new EventEmitter<String>();
  ngOnInit() {
  }

  convertTotal(t: number) {
    return t.toFixed(2);
  }

  closeOrders() {
    this.callParent.emit();
  }
}
