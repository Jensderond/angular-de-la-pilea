///<reference path="../../node_modules/@angular/router/src/config.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Http, RequestOptions, HttpModule} from '@angular/http';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PlantsComponent } from './plants/plants.component';
import { PersonalPlantListComponent } from './personal-plant-list/personal-plant-list.component';
import { PlantDetailComponent } from './plants/plant-detail/plant-detail.component';
import { PlantEditComponent } from './plants/plant-edit/plant-edit.component';
import { PlantListComponent } from './plants/plant-list/plant-list.component';
import { PersonalPlantEditComponent } from './personal-plant-list/personal-plant-edit/personal-plant-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { UserService } from './shared/user.service';

import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlantStartComponent } from './plants/plant-start/plant-start.component';
import { PlantItemComponent } from './plants/plant-list/plant-item/plant-item.component';
import {PersonalPlantListService} from './personal-plant-list/personal-plant-list.service';
import {PlantService} from './plants/plant.service';
import { PersonalPlantListItemComponent } from './personal-plant-list/personal-plant-list-item/personal-plant-list-item.component';
import { PersonalPlantListStartComponent } from './personal-plant-list/personal-plant-list-start/personal-plant-list-start.component';
import { PersonalPlantListDetailComponent } from './personal-plant-list/personal-plant-list-detail/personal-plant-list-detail.component';
import { WidgetTopPlantsComponent } from './home/widget-top-plants/widget-top-plants.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlantsComponent,
    PersonalPlantListComponent,
    PlantDetailComponent,
    PlantEditComponent,
    PlantListComponent,
    PersonalPlantEditComponent,
    DropdownDirective,
    CallbackComponent,
    HomeComponent,
    ProfileComponent,
    PlantStartComponent,
    PlantItemComponent,
    LoginComponent,
    RegisterComponent,
    PersonalPlantListItemComponent,
    PersonalPlantListStartComponent,
    PersonalPlantListDetailComponent,
    WidgetTopPlantsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    PersonalPlantListService,
    PlantService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
