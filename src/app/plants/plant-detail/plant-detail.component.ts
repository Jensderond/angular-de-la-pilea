import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlantService} from '../plant.service';
import {Plant} from '../../shared/plant.model';
import {PlantList} from '../../shared/plant-list.model';
import {Subscription} from 'rxjs/Subscription';
import {PersonalPlantListService} from '../../personal-plant-list/personal-plant-list.service';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit {
  private id: string;
  public currentPlant: Plant;
  public plantLists: PlantList[];
  public subscription: Subscription;

  constructor(public auth: AuthService,
                private plantService: PlantService,
                private route: ActivatedRoute,
                private pplService: PersonalPlantListService,
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
    this.subscription = this.pplService.plantListsChanged
      .subscribe(
        (lists: PlantList[]) => {
          this.plantLists = lists;
        }
      );

    this.pplService.getLists()
      .then(res => {
        this.plantLists = res;
      })
      .catch(err => console.log(err));
  }

  public toPlantList(listId) {
    if (this.currentPlant._id !== undefined || listId !== undefined) {
      this.pplService.addToList(listId, this.currentPlant._id);
    }
  }
}
