import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService,
              private router: Router) {
    if ( !this.auth.isAuthenticated() ) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
