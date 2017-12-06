import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantStartComponent } from './plant-start.component';

describe('PlantStartComponent', () => {
  let component: PlantStartComponent;
  let fixture: ComponentFixture<PlantStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
