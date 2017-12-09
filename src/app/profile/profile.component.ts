import { Component, OnInit} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as jwt_decode from 'jwt-decode';
import { User } from '../shared/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User;

  constructor(public auth: AuthService,
              private router: Router) {
    if ( !this.auth.isAuthenticated() ) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    if ( this.auth.isAuthenticated() ) {
      this.getProfileInfo(this.auth.getToken());
    }
  }

  public getProfileInfo(token) {
    const profileInfo = jwt_decode(token);
    this.user = new User( profileInfo.userId, profileInfo.name, profileInfo.email, null, profileInfo.age );
  }

}
