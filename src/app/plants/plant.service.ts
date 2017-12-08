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

  getPlant(id: string) {
    return this.http.get(apiEndpoint + '/plants/' + id , this.auth.jwt())
        .toPromise()
        .then(res => {
          // this.plants = res.json();
          return res.json() as Plant;
        })
        .catch(err => {
          return this.handleError(err);
        });
  }

  addPlant(plant: Plant) {
    this.http.post(apiEndpoint + '/plants', plant, this.auth.jwt())
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
    this.http.put(apiEndpoint + '/plants/' + id, newPlant).subscribe();

    this.plantsChanged.next(this.plants.slice());
  }

  deletePlant(index: number) {
    const old = this.plants[index];
    this.plants.splice(index, 1);

    this.http.delete(apiEndpoint + '/plants/' + old.id).subscribe();

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