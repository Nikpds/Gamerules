import { Injectable } from '@angular/core';

import { SnotifyService } from 'ng-snotify';
@Injectable()
export class NotifyService {

  constructor(
    private notify: SnotifyService
  ) { }

  public error(msg ="Σφάλμα ανάκτησης δεδομένων.", title = "Σφάλμα !") {
    this.notify.error(msg, title);
  }

  public success(msg: string, title = "Επιτυχία !") {
    this.notify.success(msg, title);
  }
}
