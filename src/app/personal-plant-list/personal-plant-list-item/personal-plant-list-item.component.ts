import {Component, Input, OnInit} from '@angular/core';
import {PlantList} from '../../shared/plant-list.model';

@Component({
  selector: 'app-personal-plant-list-item',
  templateUrl: './personal-plant-list-item.component.html',
  styleUrls: ['./personal-plant-list-item.component.css']
})
export class PersonalPlantListItemComponent implements OnInit {
  @Input() list: PlantList;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
