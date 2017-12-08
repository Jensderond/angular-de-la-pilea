import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantsComponent } from './plants/plants.component';
import { PersonalPlantListComponent } from './personal-plant-list/personal-plant-list.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PlantStartComponent} from './plants/plant-start/plant-start.component';
import {PlantEditComponent} from './plants/plant-edit/plant-edit.component';
import {PlantDetailComponent} from './plants/plant-detail/plant-detail.component';
import {PersonalPlantListItemComponent} from './personal-plant-list/personal-plant-list-item/personal-plant-list-item.component';
import {PersonalPlantListStartComponent} from './personal-plant-list/personal-plant-list-start/personal-plant-list-start.component';
import {PersonalPlantListDetailComponent} from './personal-plant-list/personal-plant-list-detail/personal-plant-list-detail.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plants', component: PlantsComponent,
    children: [
      { path: '', component: PlantStartComponent },
      { path: 'new', component: PlantEditComponent },
      { path: ':id', component: PlantDetailComponent },
      { path: ':id/edit', component: PlantEditComponent },
    ] },
  { path: 'personal-plant-list', component: PersonalPlantListComponent ,
    children: [
    { path: '', component: PersonalPlantListStartComponent },
    { path: 'new', component: PlantEditComponent },
    { path: ':id', component: PersonalPlantListDetailComponent },
  ] },
  { path: 'callback', component: CallbackComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
