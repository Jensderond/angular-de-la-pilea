import {ChangeDetectorRef, Injectable, Input} from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Plant } from '../shared/plant.model';
import {Headers, Http} from '@angular/http';
import { APP_CONFIG } from '../shared/data.service';
import {AuthService} from '../auth/auth.service';
import {PlantList} from '../shared/plant-list.model';

@Injectable()
export class PersonalPlantListService {
  private plantLists: PlantList[] = [];
  public plantListsChanged = new Subject<PlantList[]>();

  constructor(private http: Http, private auth: AuthService) {}

  public getLists() {
    return this.http.get(APP_CONFIG.apiUrl + '/plant-list', this.auth.jwt())
      .toPromise()
      .then(res => {
        this.plantLists = res.json() as PlantList[];
        return res.json() as PlantList[];
      })
      .catch(err => {
        return this.handleError(err);
      });
  }

  public getList(id: string) {
    return this.http.get(APP_CONFIG.apiUrl + '/plant-list/' + id , this.auth.jwt())
      .toPromise()
      .then(res => {
        return res.json() as PlantList;
      })
      .catch(err => {
        return this.handleError(err);
      });
  }

  public addPlantList(list: PlantList) {
    this.http.post(APP_CONFIG.apiUrl + '/plant-list', list, this.auth.jwt())
      .toPromise()
      .then(res => {
        this.plantLists.push(res.json() as PlantList);
        this.plantListsChanged.next(this.plantLists.slice());
      })
      .catch(err => {
        return this.handleError(err);
      });
  }

  public changeName(listId: string, newName: string) {
    this.http.put(APP_CONFIG.apiUrl + '/plant-list/' + listId + '/updateName' , { name: newName }, this.auth.jwt())
      .toPromise()
      .then(resp => {
        const index = this.findListIndex(listId);
        this.plantLists[index].room = newName;
        this.plantListsChanged.next(this.plantLists.slice());
      })
      .catch((err) => {
        return this.handleError(err);
      });
  }

  public waterPlant(listId: string, plantId: string) {
    this.http.put(APP_CONFIG.apiUrl + '/plant-list/' + listId + '/' + plantId + '/watered', { }, this.auth.jwt())
      .toPromise()
      .then(resp => {
        console.log(resp.json());
      })
      .catch((err) => {
        return this.handleError(err);
      });
  }

  public addToList(listId: string, plantId: string) {
    this.http.put(APP_CONFIG.apiUrl + '/plant-list/' + listId, { plantId: plantId }, this.auth.jwt())
      .toPromise()
      .then(resp => {
        console.log(resp.json());
      })
      .catch((err) => {
        return this.handleError(err);
      });
  }

  public removeFromList(listId: string, plantId: string) {
    // Remove the relationship from the database
    this.http.delete(APP_CONFIG.apiUrl + '/plant-list/' + listId + '/' + plantId, this.auth.jwt())
      .toPromise()
      .then(resp => {
        console.log(resp.json());
      })
      .catch((err) => {
        return this.handleError(err);
      });
  }

  public deleteList(listId: string) {
    const index = this.findListIndex(listId);
    this.http.delete(APP_CONFIG.apiUrl + '/plant-list/' + listId, this.auth.jwt()).subscribe();
    this.plantLists.splice(index, 1);
    this.plantListsChanged.next(this.plantLists.slice());
  }

  private findListIndex(id: string): number {
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
