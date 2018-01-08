import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { EmailmessageComponent } from './emailmessage/emailmessage.component';
import { AuthGuard } from '../auth/auth.guard';
import { EmailService } from './email.service';
import { EmailmessageListComponent } from './emailmessage-list/emailmessage-list.component';

const routes: Route[] = [
  { path: 'email/messages', component: EmailmessageListComponent, canActivate: [AuthGuard] },
  { path: 'email/message/new', component: EmailmessageComponent, canActivate: [AuthGuard] },
  { path: 'email/message/:id', component: EmailmessageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    EmailmessageComponent,
    EmailmessageListComponent
  ],
  providers: [
    EmailService
  ],
  exports: [
  ]
})
export class EmailModule { }
