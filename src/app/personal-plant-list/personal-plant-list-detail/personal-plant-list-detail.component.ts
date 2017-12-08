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
              console.log(this.currentList);
            })
            .catch(error => console.log(error));
        }
      );
  }

}
