import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlantService} from '../plant.service';
import {User} from '../../shared/user.model';
import {Plant} from '../../shared/plant.model';

@Component({
  selector: 'app-plant-edit',
  templateUrl: './plant-edit.component.html',
  styleUrls: ['./plant-edit.component.css']
})
export class PlantEditComponent implements OnInit {
  public loading = false;
  public error = '';
  public plantForm: FormGroup;

  constructor(public auth: AuthService,
              private route: ActivatedRoute,
              private plantService: PlantService,
              private router: Router) { }

  ngOnInit() {
    // this.plant = new Plant();
    if ( !this.auth.isAuthenticated() ) {
      this.router.navigate(['/']);
    }
    this.initForm();
  }

  onSubmit() {
    this.loading = true;
    if ( this.plantForm.valid ) {
       this.plantService.addPlant(this.plantForm.value);
       this.onCancel();
    }
  }

  onAddNickname() {
    (<FormArray>this.plantForm.get('nicknames')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteNickname(index: number) {
    (<FormArray>this.plantForm.get('nicknames')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    const plantNicknames = new FormArray([]);

    this.plantForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'genus': new FormControl(null, Validators.required),
      'type': new FormControl(null, Validators.required),
      'waterLevel': new FormControl(null,  [
        Validators.required,
        Validators.pattern(/[1-9]|10/)
      ]),
      'sunLevel': new FormControl(null,  [
        Validators.required,
        Validators.pattern(/[1-9]|10/)
      ]),
      'nicknames': plantNicknames
    });
  }

}
