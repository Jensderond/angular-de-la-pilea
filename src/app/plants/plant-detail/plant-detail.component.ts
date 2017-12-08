import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlantService} from '../plant.service';
import {Plant} from '../../shared/plant.model';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit {
  private id: string;
  public currentPlant: Plant;

  constructor(public auth: AuthService,
                private plantService: PlantService,
                private route: ActivatedRoute,
                private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.plantService.getPlant(this.id.toString())
            .then(plant => {
              this.currentPlant = plant;
            })
            .catch(error => console.log(error));
        }
      );
  }

}
