import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlantService} from '../plant.service';

@Component({
  selector: 'app-plant-edit',
  templateUrl: './plant-edit.component.html',
  styleUrls: ['./plant-edit.component.css']
})
export class PlantEditComponent implements OnInit {
  id: number;
  editMode = false;
  plantForm: FormGroup;
  constructor(public auth: AuthService,
              private route: ActivatedRoute,
              private plantService: PlantService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.plantService.updatePlant(this.id, this.plantForm.value);
    } else {
      this.plantService.addPlant(this.plantForm.value);
    }
    this.onCancel();
  }

  onAddNickname() {
    (<FormArray>this.plantForm.get('nicknames')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let plantName = '';
    let plantImagePath = '';
    let plantDescription = '';
    const plantNicknames = new FormArray([]);

    if (this.editMode) {
      const plant = this.plantService.getPlant(this.id);
      plantName = plant.name;
      plantImagePath = plant.imagePath;
      plantDescription = plant.description;
      if (plant['nicknames']) {
        for (const nickname of plant.nicknames ) {
          plantNicknames.push(
            new FormGroup({
              'name': new FormControl(nickname, Validators.required)
            })
          );
        }
      }
    }

    this.plantForm = new FormGroup({
      'name': new FormControl(plantName, Validators.required),
      'imagePath': new FormControl(plantImagePath, Validators.required),
      'description': new FormControl(plantDescription, Validators.required),
      'nicknames': plantNicknames
    });
  }

}
