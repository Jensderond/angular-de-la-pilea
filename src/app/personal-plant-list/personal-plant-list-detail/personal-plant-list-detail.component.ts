import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {PlantList} from '../../shared/plant-list.model';
import {PersonalPlantListService} from '../personal-plant-list.service';
import * as moment from 'moment';

@Component({
  selector: 'app-personal-plant-list-detail',
  templateUrl: './personal-plant-list-detail.component.html',
  styleUrls: ['./personal-plant-list-detail.component.css']
})
export class PersonalPlantListDetailComponent implements OnInit {
  private id: string;
  public currentList: PlantList;
  public editList: boolean;
  public newName: string;

  constructor(public auth: AuthService,
              private pplService: PersonalPlantListService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.editList = false;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.pplService.getList(this.id.toString())
            .then(list => {
              this.currentList = list;
              this.newName = this.currentList.room;
              for ( let i = 0; i < this.currentList.plants.length; i++) {
                const lastTime = this.currentList.plants[i].lastWatered;
                this.currentList.plants[i].lastWatered = moment(lastTime, 'YYYYMMDD, h:mm').fromNow();
              }
            })
            .catch(error => console.log(error));
        }
      );
  }

  public waterPlant(plantId: string) {
    this.pplService.waterPlant(this.id.toString(), plantId);
    const plantIndex = this.findPlantIndex(this.currentList, plantId);
    this.currentList.plants[plantIndex].lastWatered = moment(this.getTodaysDate(), 'YYYYMMDD, h:mm').fromNow();
  }

  public editTitle() {
    this.editList = this.editList !== true;
    if (this.editList === false) {
      this.pplService.changeName(this.id.toString(), this.newName );
      this.currentList.room = this.newName;
    }
  }

  public removePlantFromList(plantId: string) {
    this.pplService.removeFromList(this.id.toString(), plantId);
    const plantIndex = this.findPlantIndex(this.currentList, plantId);
    this.currentList.plants.splice(plantIndex, 1);
  }

  private findPlantIndex(list: PlantList, id: string): number {
    for (let i = 0; i < list.plants.length; i++) {
      if ( list.plants[i]['id'] === id ) {
        return i;
      }
    }
    return -1;
  }

  private getTodaysDate(): string {
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = today.getUTCMonth() + 1; // months from 1-12
    const day = today.getUTCDate();
    const hour = today.getUTCHours() + 1;
    const minutes = today.getUTCMinutes();
    return year + '' + month + '' + day + '' + hour + '' + minutes;
  }

  public onDelete() {
    this.pplService.deleteList(this.id.toString());
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
