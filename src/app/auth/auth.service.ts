import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { tokenNotExpired, AuthHttp, JwtHelper } from 'angular2-jwt';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { environment } from '../../environments/environment';


@Injectable()
export class AuthService {
  private usersUrl = environment.api + 'users';
  private authUrl = environment.api + 'auth';

  private loggedInSubject$ = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject$.asObservable();


  constructor(
    private router: Router,
    private http: Http,
    private authHttp: AuthHttp
  ) {
    this.loggedIn = this.isAuthanticated ? true : false;
  }

  get loggedIn(): boolean {
    return this.loggedInSubject$.getValue();
  }

  set loggedIn(value: boolean) {
    this.loggedInSubject$.next(value);
  }

  get isAuthanticated() {
    return tokenNotExpired('grules_token');
  }

  public login(username: string, password: string): Observable<any> {

    const body: any = { 'Username': username, 'Password': password };
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.authUrl, body, options)
      .map((response: any) => {
        const token = response.json().token;
        if (token) {
          localStorage.setItem('grules_token', token);
          this.loggedIn = true;
          return true;
        } else {
          this.loggedIn = false;
          return false;
        }
      })
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  public logout() {
    localStorage.removeItem("grules_token");
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  private authJsonHeaders(): Observable<Headers> {
    const header = new Headers();

    header.append('Content-Type', 'application/json');
    header.append('Accept', 'application/json');

    const token = localStorage.getItem('grules_token');
    if (token) {
      header.append('Authorization', 'Bearer ' + token);
      return Observable.of(header);
    } else {
      this.loggedIn = false;
      return Observable.of(header);
    }
  }

  // Rest API HTTP methods
  public get(url: string): Observable<any> {
    return this.authJsonHeaders().flatMap(res => {
      return this.http.get(url, { headers: res })
        .map(result => result)
        .catch(err => this.handleError(err));
    });
  }

  public post(url: string, data: any): Observable<any> {
    return this.authJsonHeaders().flatMap(res => {
      return this.http.post(url, data, { headers: res })
        .map(result => result)
        .catch(err => this.handleError(err));
    });
  }

  public put(url: string, data: any): Observable<any> {
    return this.authJsonHeaders().flatMap(res => {
      return this.http.put(url, data, { headers: res })
        .map(result => result)
        .catch(err => this.handleError(err));
    });
  }

  public delete(url: string): Observable<any> {
    return this.authJsonHeaders().flatMap(res => {
      return this.http.delete(url, { headers: res })
        .map(result => result)
        .catch(err => this.handleError(err));
    });
  }

  private handleError(error: Response) {
    if (error.status === 401) {
      this.loggedIn = false;
      this.router.navigateByUrl('/login');
      return Observable.throw(error.statusText);
    } else {
      return Observable.throw(error.text());
    }
  }
}
