import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-personal-plant-edit',
  templateUrl: './personal-plant-edit.component.html',
  styleUrls: ['./personal-plant-edit.component.css']
})
export class PersonalPlantEditComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
