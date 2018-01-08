import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

import { AuthService } from '../auth.service';
import { LoaderService } from '../../shared/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  animations: []
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  
  constructor(
    private authService: AuthService,
    private loader: LoaderService,
    private router: Router,
    private notify: SnotifyService,
  ) {}

  ngOnInit() {
    if (this.authService.isAuthanticated) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.loader.show();
    this.authService.login(this.username, this.password).subscribe(res => {
      if (res) {
        this.router.navigate(['/home']);
      } else {
        this.notify.warning('Το Όνομα Χρήστη ή ο κωδικός είναι λάθος!',"Ειδοποίηση");
      }
      this.loader.hide();
    }, error => {
      this.loader.hide();
    
    });
  }
}
