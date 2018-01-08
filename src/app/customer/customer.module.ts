import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AuthGuard } from '../auth/auth.guard';
import { CustomerService } from './customer.service';

const routes: Route[] = [
  { path: 'customers', component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: 'customer/:id/details', component: CustomerDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    CustomerListComponent,
    CustomerDetailsComponent
  ],
  providers: [
    CustomerService
  ],
  exports: [

  ]
})
export class CustomerModule { }
