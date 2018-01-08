import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


import { OrderListComponent } from './order-list/order-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { OrderService } from './order.service';
import { OrderListFiltersComponent } from './order-list-filters/order-list-filters.component';
import { OrderListModalComponent } from './order-list-modal/order-list-modal.component';

const routes: Route[] = [
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    OrderListComponent,
    OrderListFiltersComponent,
    OrderListModalComponent
  ],
  providers: [
    OrderService
  ],
  exports: [

  ]
})
export class OrderModule { }
