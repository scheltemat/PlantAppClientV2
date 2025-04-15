import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPlantComponent } from './find-plant.component';

describe('FindPlantComponent', () => {
  let component: FindPlantComponent;
  let fixture: ComponentFixture<FindPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindPlantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
