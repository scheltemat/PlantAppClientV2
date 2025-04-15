import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSinglePlantComponent } from './find-single-plant.component';

describe('FindSinglePlantComponent', () => {
  let component: FindSinglePlantComponent;
  let fixture: ComponentFixture<FindSinglePlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindSinglePlantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindSinglePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
