import {ChangeDetectorRef, Injectable, Input} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {APP_CONFIG } from './data.service';
import {AuthService} from '../auth/auth.service';
import {User} from './user.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

  constructor(private http: Http, private auth: AuthService) {}

  addUser(user: User) {
    return this.http.post(APP_CONFIG.apiUrl + '/register', user, this.auth.jwt())
      .map((response: Response) => {
        return response.status === 201;
      })
      .catch(err => {
        // return this.handleError(err);
        if (err.status === 403) {
          return Observable.throw('Unauthorized');
        }
      });

  }

}
