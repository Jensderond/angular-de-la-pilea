import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {PlantService} from '../plant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Plant} from '../../shared/plant.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit, OnDestroy {

  plants: Plant[];
  subscription: Subscription;
  constructor(public auth: AuthService,
              private plantService: PlantService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.plantService.plantsChanged
      .subscribe(
        (plants: Plant[]) => {
          this.plants = plants;
        }
      );

    this.plantService.getPlants().then(plants => {
      this.plants = plants;
    });
  }

  onNewPlant() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
  }

}
