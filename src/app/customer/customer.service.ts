import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Customer } from '../app.models';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CustomerService {
  private customerUrl = environment.api + 'customer';

  constructor(
    private auth: AuthService
  ) { }

  getCustomers(): Observable<Array<Customer>> {
    return this.auth.get(this.customerUrl + '/oc_customers')
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }

  getCustomer(id: string): Observable<Customer> {
    return this.auth.get(this.customerUrl + '/oc_customer/' + id)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.auth.post(this.customerUrl + '/update/', customer)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }
}
