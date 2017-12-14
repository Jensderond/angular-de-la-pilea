import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { APP_CONFIG } from '../shared/data.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if ( localStorage.getItem( APP_CONFIG.tokenName ) ) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
