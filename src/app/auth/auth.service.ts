import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as jwt_decode from 'jwt-decode';
import { APP_CONFIG } from '../shared/data.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }


  public isAuthenticated(): boolean {
    if ( this.getToken() ) {
      const expiresAt = this.getTokenExpirationDate(this.getToken());
      return new Date().getTime() < expiresAt.getTime();
    } else {
      return false;
    }

  }

  public jwt() {
    if ( this.getToken() ) {
      const headers = new Headers({ 'Content-Type': 'application/json', 'X-Access-Token': this.getToken() });
      return new RequestOptions({ headers: headers});
    }
  }

  public getToken(): string {
    return localStorage.getItem(APP_CONFIG.tokenName);
  }

  private setToken(token: string): void {
    localStorage.setItem(APP_CONFIG.tokenName, token);
  }

  public getUserId(): string {
    const decoded = jwt_decode(this.getToken());

    if (decoded.userId === undefined) { return null; }

    return decoded.userId;
  }

  public getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post( APP_CONFIG.apiUrl + '/authenticate', { email: username, password: password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const responseToken = response.json().token;
        if (responseToken) {

          // store username and jwt token in local storage to keep user logged in between page refreshes
          this.setToken(responseToken);

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      })
      .catch(e => {
        if (e.status === 403) {
          return Observable.throw('Unauthorized');
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem(APP_CONFIG.tokenName);
  }
}
