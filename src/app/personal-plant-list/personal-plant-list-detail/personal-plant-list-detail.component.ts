import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {PlantList} from '../../shared/plant-list.model';
import {PersonalPlantListService} from '../personal-plant-list.service';

@Component({
  selector: 'app-personal-plant-list-detail',
  templateUrl: './personal-plant-list-detail.component.html',
  styleUrls: ['./personal-plant-list-detail.component.css']
})
export class PersonalPlantListDetailComponent implements OnInit {
  private id: string;
  public currentList: PlantList;

  constructor(public auth: AuthService,
              private pplService: PersonalPlantListService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.pplService.getList(this.id.toString())
            .then(list => {
              this.currentList = list;
            })
            .catch(error => console.log(error));
        }
      );
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

  public onDelete() {
    this.pplService.deleteList(this.id.toString());
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
