import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPlantListComponent } from './personal-plant-list.component';

describe('PersonalPlantListComponent', () => {
  let component: PersonalPlantListComponent;
  let fixture: ComponentFixture<PersonalPlantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalPlantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalPlantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
