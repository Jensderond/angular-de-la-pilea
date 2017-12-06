///<reference path="../../node_modules/@angular/router/src/config.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import {RouterModule} from '@angular/router';



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

import { AuthService } from './auth/auth.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
}


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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
