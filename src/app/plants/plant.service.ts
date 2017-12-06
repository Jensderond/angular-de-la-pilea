import {ChangeDetectorRef, Injectable, Input} from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Plant } from '../shared/plant.model';
import { PersonalPlantListService } from '../personal-plant-list/personal-plant-list.service';
import { HttpClient } from '@angular/common/http';
import { AuthHttp } from 'angular2-jwt';
import { apiEndpoint } from '../shared/data.service';

@Injectable()
export class PlantService {
  plantsChanged = new Subject<Plant[]>();

  public plants: Plant[] = [];

  constructor(private slService: PersonalPlantListService, private http: HttpClient, private authHttp: AuthHttp) {}

  // getPlants(): Promise<Plant[]> {
  //   return this.authHttp.get(apiEndpoint + '/plants').toPromise().then(response => {
  //     this.plants = response as Plant[];
  //     return this.plants;
  //   });
  // }

  getPlants(): Promise<Plant[]> {
    return this.authHttp.get(apiEndpoint + '/plants').toPromise()
      .then( map(res => res.json()))
  }

  getPlant(index: number) {
    return this.plants[index];
  }

  addPlant(plant: Plant) {
    this.authHttp.post(apiEndpoint + '/plants', plant).subscribe(data => {
      this.plants.push(<Plant>data);
      this.plantsChanged.next(this.plants.slice());
    });
  }

  updatePlant(index: number, newPlant: Plant) {
    const old = this.plants[index];

    this.plants[index] = newPlant;
    this.http.put(apiEndpoint + '/plants/' + old.id, newPlant).subscribe();

    this.plantsChanged.next(this.plants.slice());
  }

  deletePlant(index: number) {
    const old = this.plants[index];
    this.plants.splice(index, 1);

    this.http.delete(apiEndpoint + '/plants/' + old.id).subscribe();

    this.plantsChanged.next(this.plants.slice());
  }

}
