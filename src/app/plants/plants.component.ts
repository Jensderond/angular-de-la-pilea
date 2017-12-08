import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.component.html',
  styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {

  constructor(public auth: AuthService,
              private router: Router) {
    if ( !this.auth.isAuthenticated() ) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
