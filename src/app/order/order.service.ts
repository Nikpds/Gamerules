import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Order, OrderProduct } from '../app.models';
import { Filter, FilteredData } from './order';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class OrderService {
  private orderUrl = environment.api + 'order';

  constructor(
    private auth: AuthService
  ) { }

  getOrders(filters: Filter): Observable<Array<Order>> {
    return this.auth.post(this.orderUrl + '/oc_orders', filters)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }

  getOrdersOfGame(id: number): Observable<Array<OrderProduct>> {
    return this.auth.get(this.orderUrl + '/ordersforgame/' + id)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }

  getOrder(id: string): Observable<Order> {
    return this.auth.get(this.orderUrl + '/oc_order/' + id)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }

  updateOrder(order: Order): Observable<Order> {
    return this.auth.put(this.orderUrl + '/update', order)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }

  cancelOrder(o: Order): Observable<Order> {
    return this.auth.post(this.orderUrl + '/cancelorder', o)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }
}
