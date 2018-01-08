import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { EmailMessage } from '../messages';

import { LoaderService } from '../../shared/loader.service';
import { NotifyService } from '../../shared/notify.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-emailmessage',
  templateUrl: './emailmessage.component.html',
  styleUrls: ['./emailmessage.component.sass']
})
export class EmailmessageComponent implements OnInit {
  message: EmailMessage;

  constructor(
    private srv: EmailService,
    private loader: LoaderService,
    private notify: NotifyService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((param: Params) => {
      const id = param['id'];
      if (id) {
        this.getEmailMessage(id);
      } else {
        this.message = new EmailMessage();
      }
    });
  }

  getEmailMessage(id: string) {
    this.loader.show();
    this.srv.getEmailMessage(id).subscribe(res => {
      this.message = res;
      this.loader.hide();
    }, error => {
      this.loader.hide();
      this.notify.error('Σφάλμα κατα την ανάκτηση δεδομένων. Επικοινωνίστε με τον διαχειριστή της εφαρμογής.');
    });
  }

  updateMessage() {
    this.loader.show();
    this.srv.updateEmailMessage(this.message).subscribe(res => {
      this.notify.success('Η αποθήκευση ολοκληρώθηκε με επιτυχία.');
      this.loader.hide();
      this.router.navigate(['/email', 'messages']);
    }, error => {
      this.loader.hide();
      this.notify.error('Σφάλμα κατα την αποθήκευση. Επικοινωνίστε με τον διαχειριστή της εφαρμογής.');
    });
  }

  save() {
    this.message.id ? this.updateMessage() : this.insertMessage();
  }

  insertMessage() {
    this.loader.show();
    this.srv.insertEmailMessage(this.message).subscribe(res => {
      this.notify.success('Η αποθήκευση ολοκληρώθηκε με επιτυχία.');
      this.loader.hide();
      this.router.navigate(['/email', 'messages']);
    }, error => {
      this.loader.hide();
      this.notify.error('Σφάλμα κατα την αποθήκευση. Επικοινωνίστε με τον διαχειριστή της εφαρμογής.');
    });
  }
}
