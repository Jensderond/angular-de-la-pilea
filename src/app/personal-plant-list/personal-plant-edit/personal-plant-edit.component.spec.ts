import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPlantEditComponent } from './personal-plant-edit.component';

describe('PersonalPlantEditComponent', () => {
  let component: PersonalPlantEditComponent;
  let fixture: ComponentFixture<PersonalPlantEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalPlantEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalPlantEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
