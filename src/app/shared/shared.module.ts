import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { LoaderService } from './loader.service';
import { NotifyService } from './notify.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { EmailFormComponent } from '../email/email-form/email-form.component';
import { SmsModalComponent } from './sms-modal/sms-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClipboardModule
  ],
  declarations: [
    ConfirmModalComponent,
    EmailFormComponent,
    SmsModalComponent
  ],
  providers: [
    LoaderService,
    NotifyService
  ],
  exports: [
    FormsModule,
    ClipboardModule,
    ConfirmModalComponent,
    EmailFormComponent,
    SmsModalComponent
  ]
})
export class SharedModule { }
