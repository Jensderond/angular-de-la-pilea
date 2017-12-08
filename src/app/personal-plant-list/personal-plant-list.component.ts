import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs/Subscription';
import {PlantList} from '../shared/plant-list.model';
import {PersonalPlantListService} from './personal-plant-list.service';

@Component({
  selector: 'app-personal-plant-list',
  templateUrl: './personal-plant-list.component.html',
  styleUrls: ['./personal-plant-list.component.css']
})
export class PersonalPlantListComponent implements OnInit {
  plantLists: PlantList[];
  subscription: Subscription;

  constructor(public auth: AuthService, private pplService: PersonalPlantListService) { }

  ngOnInit() {
    this.subscription = this.pplService.plantListsChanged
      .subscribe(
        (lists: PlantList[]) => {
          this.plantLists = lists;
        }
      );

    this.pplService.getLists()
      .then(res => {
        this.plantLists = res;
        console.log(res);
      })
      .catch(err => console.log(err));
  }

}
