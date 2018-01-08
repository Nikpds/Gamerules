import { Component, OnInit } from '@angular/core';

import { EmailMessage } from '../messages';

import { LoaderService } from '../../shared/loader.service';
import { NotifyService } from '../../shared/notify.service';
import { EmailService } from '../email.service';
@Component({
  selector: 'app-emailmessage-list',
  templateUrl: './emailmessage-list.component.html',
  styleUrls: ['./emailmessage-list.component.sass']
})
export class EmailmessageListComponent implements OnInit {
  messages = new Array<EmailMessage>();

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

  deleteMessage(msg: EmailMessage) {
    this.loader.show();
    this.srv.deleteEmailMessage(msg).subscribe(res => {
      const index = this.messages.findIndex(i => i.id === msg.id);
      this.messages.splice(index, 1);
      this.notify.success('Η διαγραφή ολοκληρώθηκε με επιτυχία.');
      this.loader.hide();
    }, error => {
      this.loader.hide();
      this.notify.error('Σφάλμα διαγραφής. Επικοινωνίστε με τον διαχειριστή της εφαρμογής.');
    });
  }

  modalAction(result: any) {
    this.deleteMessage(result.data);
  }
}
