import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {PlantService} from '../plants/plant.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  constructor(public auth: AuthService,
              private route: ActivatedRoute,
              private plantService: PlantService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit(){

  }

  onLogin() {
    this.router.navigate(['/login'], {relativeTo: this.route});
  }

  private initForm() {
    this.registerForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'age': new FormControl('', Validators.required),
    });
  }
}
