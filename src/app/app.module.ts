import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SnotifyModule, SnotifyService, ToastDefaults, SnotifyPosition } from 'ng-snotify';

import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { EmailModule } from './email/email.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';


const routes: Route[] = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    SharedModule,
    EmailModule,
    CustomerModule,
    OrderModule,
    AuthModule,
    HttpModule,
    RouterModule.forRoot(routes),
    SnotifyModule
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  positions = SnotifyPosition;

  constructor(
    private notify: SnotifyService,
  ) {
    this.notify.config.toast.timeout = 5000;
    this.notify.config.toast.pauseOnHover = true;
    this.notify.config.toast.position = this.positions.centerTop;
    this.notify.config.toast.bodyMaxLength = 300;
    this.notify.config.toast.titleMaxLength = 300;
  }
}
