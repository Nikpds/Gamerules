import { Component, OnInit } from '@angular/core';

import { EmailMessage, ClientEmail } from '../messages';

import { LoaderService } from '../../shared/loader.service';
import { NotifyService } from '../../shared/notify.service';
import { EmailService } from '../email.service';
@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.sass']
})
export class EmailFormComponent implements OnInit {
  messages = new Array<EmailMessage>();
  openEmailSender = false;
  email: ClientEmail;
  constructor(
    private srv: EmailService,
    private loader: LoaderService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.getEmailMessages();
  }

  getEmailMessages() {
    this.loader.show();
    this.srv.getEmailMessages().subscribe(res => {
      this.messages = res;
      this.loader.hide();
    }, error => {
      this.loader.hide();
      this.notify.error('Σφάλμα ανάκτησης δεδομένων. Επικοινωνίστε με τον διαχειριστή της εφαρμογής.');
    });
  }

  openEmailForm(fullname: string, email: string) {
    this.email = new ClientEmail();
    this.email.fullname = fullname;
    this.email.email = 'perpegr@hotmail.com';
    this.openEmailSender = true;
  }

  close() {
    this.openEmailSender = false;
  }

  sendEmail() {
    this.loader.show();
    this.openEmailSender = false;
    this.srv.sendEmailToClient(this.email).subscribe(res => {
      this.notify.success('', 'Αποστολή επιτυχής');
      this.loader.hide();
      this.openEmailSender = false;
    }, error => {
      this.loader.hide();
      this.notify.error('Σφάλμα αποστολής email. Επικοινωνίστε με τον διαχειριστή της εφαρμογής.');
    });
  }

}
