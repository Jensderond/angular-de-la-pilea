import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonalPlantListService} from '../personal-plant-list.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-personal-plant-edit',
  templateUrl: './personal-plant-edit.component.html',
  styleUrls: ['./personal-plant-edit.component.css']
})
export class PersonalPlantEditComponent implements OnInit {
  public loading = false;
  public error = '';
  public plantListForm: FormGroup;

  constructor(public auth: AuthService,
              private route: ActivatedRoute,
              private pplService: PersonalPlantListService,
              private router: Router) { }

  ngOnInit() {
    if ( !this.auth.isAuthenticated() ) {
      this.router.navigate(['/']);
    }
    this.initForm();
  }

  public onSubmit() {
    this.loading = true;
    if ( this.plantListForm.valid ) {
      this.pplService.addPlantList(this.plantListForm.value);
      this.onCancel();
    }
  }

  public onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    this.plantListForm = new FormGroup({
      'userObjectId': new FormControl(this.auth.getUserId(), Validators.required),
      'room': new FormControl(null, Validators.required)
    });
  }
}
