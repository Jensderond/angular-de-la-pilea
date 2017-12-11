import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  model: any = {};
  loading = false;
  error = '';

  constructor(private router: Router,
              private auth: AuthService) {
  }

  ngOnInit() {
    // reset login status
    if ( this.auth.isAuthenticated() ) {
      this.router.navigate(['/']);
    }
    document.body.className += 'login';
  }

  ngOnDestroy() {
    document.body.classList.remove('login');
  }

  login() {
    this.loading = true;
    this.auth.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      }, (err) => {
        if (err === 'Unauthorized') {
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      });
  }

  toRegisterPage() {
    this.router.navigate(['/register']);
  }
}
