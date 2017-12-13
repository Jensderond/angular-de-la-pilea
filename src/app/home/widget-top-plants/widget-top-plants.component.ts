import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PlantService} from '../../plants/plant.service';
import {Plant} from '../../shared/plant.model';

@Component({
  selector: 'app-widget-top-plants',
  templateUrl: './widget-top-plants.component.html'
})
export class WidgetTopPlantsComponent implements OnInit {
  topPlants: Plant[];
  constructor(public auth: AuthService,
              private plantService: PlantService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.plantService.getTopPlants()
      .then(res => this.topPlants = res)
      .catch(err => console.log(err));
  }

}
