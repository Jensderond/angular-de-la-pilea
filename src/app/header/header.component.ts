import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }


  toLoginPage() {
    this.router.navigate(['/login']);
  }

}
