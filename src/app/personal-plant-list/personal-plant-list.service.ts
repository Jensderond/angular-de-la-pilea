import {ChangeDetectorRef, Injectable, Input} from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Plant } from '../shared/plant.model';
import {Headers, Http} from '@angular/http';
import { apiEndpoint } from '../shared/data.service';
import {AuthService} from '../auth/auth.service';
import {PlantList} from '../shared/plant-list.model';

@Injectable()
export class PersonalPlantListService {
  private plantLists: PlantList[] = [];
  public plantListsChanged = new Subject<PlantList[]>();

  constructor(private http: Http, private auth: AuthService) {}

  getLists() {
    return this.http.get(apiEndpoint + '/plant-list', this.auth.jwt())
      .toPromise()
      .then(res => {
        this.plantLists = res.json();
        return res.json() as PlantList[];
      })
      .catch(err => {
        return this.handleError(err);
      });
    // this.plants = response as Plant[];
  }

  getList(id: string) {
    return this.http.get(apiEndpoint + '/plant-list/' + id , this.auth.jwt())
      .toPromise()
      .then(res => {
        // this.plants = res.json();
        return res.json() as PlantList;
      })
      .catch(err => {
        return this.handleError(err);
      });
  }

  addPlantList(list: PlantList) {
    this.http.post(apiEndpoint + '/plant-list', list, this.auth.jwt())
      .toPromise()
      .then(res => {
        this.plantLists.push(res.json() as PlantList);
        this.plantListsChanged.next(this.plantLists.slice());
      })
      .catch(err => {
        return this.handleError(err);
      });
  }

  updatePlant(id: string, newPlant: PlantList) {
    const index = this.findIndex(id);

    this.plantLists[index] = newPlant;
    this.http.put(apiEndpoint + '/plant-list/' + id, newPlant).subscribe();

    this.plantListsChanged.next(this.plantLists.slice());
  }

  deletePlant(index: number) {
    const old = this.plantLists[index];
    this.plantLists.splice(index, 1);

    this.http.delete(apiEndpoint + '/plant-list/' + old.id).subscribe();

    this.plantListsChanged.next(this.plantLists.slice());
  }

  private findIndex(id: string): number {
    for (let i = 0; i < this.plantLists.length; i++) {
      if ( this.plantLists[i]['_id'] === id ) {
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
