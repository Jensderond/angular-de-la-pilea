import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {PlantService} from '../plants/plant.service';
import {UserService} from '../shared/user.service';
import {User} from '../shared/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public user: User;
  public loading = false;
  public error = '';

  constructor(public auth: AuthService,
              private route: ActivatedRoute,
              private plantService: PlantService,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user = new User();
    if ( this.auth.isAuthenticated() ) {
      this.router.navigate(['/']);
    }
    document.body.className += 'register';
  }

  ngOnDestroy() {
    document.body.classList.remove('register');
  }

  register() {
    if ( this.user.name !== '' ) {
      this.loading = true;
      this.userService.addUser(this.user)
        .subscribe(result => {
          if (result === true) {
            this.router.navigate(['/login']);
          }
        }, (err) => {
          if (err === 'Unauthorized') {
            this.error = 'User with this email already exists';
            this.loading = false;
          }
        });
    }
  }

  onLogin() {
    this.router.navigate(['/login'], {relativeTo: this.route});
  }
}
