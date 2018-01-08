import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { EmailMessage, ClientEmail, SmsMessage } from './messages';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class EmailService {
  private emailUrl = environment.api + 'email';
  private smsUrl = environment.api + 'sms';
  constructor(
    private auth: AuthService
  ) { }

  insertEmailMessage(msg: EmailMessage): Observable<EmailMessage> {
    return this.auth.post(this.emailUrl + '/new/', msg)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }

  updateEmailMessage(msg: EmailMessage): Observable<EmailMessage> {
    return this.auth.post(this.emailUrl + '/update/', msg)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }

  deleteEmailMessage(msg: EmailMessage): Observable<boolean> {
    return this.auth.post(this.emailUrl + '/delete/', msg)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }

  getEmailMessage(id: string): Observable<EmailMessage> {
    return this.auth.get(this.emailUrl + '/' + id)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }

  getEmailMessages(): Observable<Array<EmailMessage>> {
    return this.auth.get(this.emailUrl + '/all')
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }

  sendEmailToClient(email: ClientEmail): Observable<boolean> {
    return this.auth.post(this.emailUrl + '/email', email)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }

  sendSmsToClient(sms: SmsMessage): Observable<string> {
    return this.auth.post(this.smsUrl + '/sms', sms)
      .map((res: Response) => res.json())
      .catch((error: string) => Observable.throw(error || 'Server error'));
  }

}
