import { Plant } from '../shared/plant.model';
import { Subject } from 'rxjs/Subject';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { apiEndpoint } from '../shared/data.service';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class PersonalPlantListService {
  private plantsChanged = new Subject<Plant[]>();
  private startedEditing = new Subject<number>();
  private headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': this.auth.getToken() });

  private plants: Plant[];

  constructor(private http: Http, private auth: AuthService) { }

  getLists(): Promise<Plant[]> {
    return this.http.get(apiEndpoint + '/plant-list', { headers: this.headers }).toPromise().then(response => {
      // this.plants = response as Plant[];
      return this.plants;
    });
    // return this.plants.slice();
  }

  getList(index: number) {
    return this.plants[index];
  }

  addPlantToList(plant: Plant) {
    this.plants.push(plant);

    this.http.post(apiEndpoint + '/plant-list', plant).subscribe();

    this.plantsChanged.next(this.plants.slice());
  }

  updateList(index: number, newPlant: Plant) {
    const old = this.plants[index];

    delete newPlant.id;

    this.plants[index] = newPlant;

    this.http.put(apiEndpoint + '/plant-list/' + old.id, newPlant).subscribe();

    this.plantsChanged.next(this.plants.slice());
  }

  deletePlantFromList(index: number) {
    const old = this.plants[index];
    this.plants.splice(index, 1);

    this.http.delete(apiEndpoint + '/plant-list/' + old.id).subscribe();

    this.plantsChanged.next(this.plants.slice());
  }
}
