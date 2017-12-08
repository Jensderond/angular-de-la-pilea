import {ChangeDetectorRef, Injectable, Input} from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Plant } from '../shared/plant.model';
import { PersonalPlantListService } from '../personal-plant-list/personal-plant-list.service';
import {Headers, Http} from '@angular/http';
import { apiEndpoint } from '../shared/data.service';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class PlantService {
  private plants: Plant[] = [];
  public plantsChanged = new Subject<Plant[]>();

  constructor(private slService: PersonalPlantListService, private http: Http, private auth: AuthService) {}

  getPlants() {
    return this.http.get(apiEndpoint + '/plants', this.auth.jwt())
      .toPromise()
      .then(res => {
        this.plants = res.json();
        return res.json() as Plant[];
      })
      .catch(err => {
        return this.handleError(err);
      });
      // this.plants = response as Plant[];
  }

  getPlant(index: number) {
    return this.plants[index];
  }

  addPlant(plant: Plant) {
    this.http.post(apiEndpoint + '/plants', plant, this.auth.jwt())
      .toPromise()
      .then(res => {
        console.log(this.plants);
        this.plants.push(res.json() as Plant);
        this.plantsChanged.next(this.plants.slice());
        console.log(this.plants);
      })
      .catch(err => {
        return this.handleError(err);
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

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
