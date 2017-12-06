import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-personal-plant-list',
  templateUrl: './personal-plant-list.component.html',
  styleUrls: ['./personal-plant-list.component.css']
})
export class PersonalPlantListComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
