import { Component, OnInit } from '@angular/core';

import { SmsMessage } from '../../email/messages';

import { LoaderService } from '../../shared/loader.service';
import { NotifyService } from '../../shared/notify.service';
import { EmailService } from '../../email/email.service';
@Component({
  selector: 'app-sms-modal',
  templateUrl: './sms-modal.component.html',
  styleUrls: ['./sms-modal.component.sass']
})
export class SmsModalComponent implements OnInit {
  openSmsSender = false;
  sms: SmsMessage;
  constructor(
    private srv: EmailService,
    private loader: LoaderService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
  }

  openSmsForm(mobile: string, fullname: string) {
    this.sms = new SmsMessage();
    this.sms.mobile = mobile;
    this.sms.fullname = fullname;
    this.openSmsSender = true;
  }

  close() {
    this.openSmsSender = false;
  }

  sendSms() {
    this.loader.show();
    this.openSmsSender = false;
    this.srv.sendSmsToClient(this.sms).subscribe(res => {
      this.notify.success('', 'Αποστολή επιτυχής');
      this.loader.hide();
      this.openSmsSender = false;
    }, error => {
      this.loader.hide();
      this.notify.error('Σφάλμα αποστολής email. Επικοινωνίστε με τον διαχειριστή της εφαρμογής.');
    });
  }
}
