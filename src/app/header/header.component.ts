import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isIn = false;
  constructor(public auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  toggleState() { // click handler
    const bool = this.isIn;
    this.isIn = bool === false;
  }

  toLoginPage() {
    this.router.navigate(['/login']);
  }

}
