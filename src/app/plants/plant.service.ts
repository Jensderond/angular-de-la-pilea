import {ChangeDetectorRef, Injectable, Input} from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Plant } from '../shared/plant.model';
import { PersonalPlantListService } from '../personal-plant-list/personal-plant-list.service';
import {Headers, Http} from '@angular/http';
import { APP_CONFIG } from '../shared/data.service';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class PlantService {
  private plants: Plant[] = [];
  public plantsChanged = new Subject<Plant[]>();

  constructor(private slService: PersonalPlantListService, private http: Http, private auth: AuthService) {}

  getPlants() {
    return this.http.get(APP_CONFIG.apiUrl + '/plants', this.auth.jwt())
      .toPromise()
      .then(res => {
        this.plants = res.json();
        return res.json() as Plant[];
      })
      .catch(err => {
        return this.handleError(err);
      });
  }

  getPlant(id: string) {
    return this.http.get(APP_CONFIG.apiUrl + '/plants/' + id , this.auth.jwt())
        .toPromise()
        .then(res => {
          // this.plants = res.json();
          return res.json() as Plant;
        })
        .catch(err => {
          return this.handleError(err);
        });
  }

  getTopPlants() {
    return this.http.get(APP_CONFIG.apiUrl + '/plants/favorites', this.auth.jwt())
      .toPromise()
      .then(res => {
        this.plants = res.json();
        return res.json() as Plant[];
      })
      .catch(err => {
        return this.handleError(err);
      });
  }

  addPlant(plant: Plant) {
    this.http.post(APP_CONFIG.apiUrl + '/plants', plant, this.auth.jwt())
      .toPromise()
      .then(res => {
        this.plants.push(res.json() as Plant);
        this.plantsChanged.next(this.plants.slice());
      })
      .catch(err => {
        return this.handleError(err);
      });
  }

  updatePlant(id: string, newPlant: Plant) {
    const index = this.findIndex(id);

    this.plants[index] = newPlant;
    this.http.put(APP_CONFIG.apiUrl + '/plants/' + id, newPlant).subscribe();

    this.plantsChanged.next(this.plants.slice());
  }

  deletePlant(index: number) {
    const old = this.plants[index];
    this.plants.splice(index, 1);

    this.http.delete(APP_CONFIG.apiUrl + '/plants/' + old.id).subscribe();

    this.plantsChanged.next(this.plants.slice());
  }

  private findIndex(id: string): number {
    for (let i = 0; i < this.plants.length; i++) {
      if ( this.plants[i]['_id'] === id ) {
        return i;
      }
    }
    return -1;
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}
