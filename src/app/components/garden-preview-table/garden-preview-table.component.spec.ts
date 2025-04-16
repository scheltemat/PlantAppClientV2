import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenPreviewTableComponent } from './garden-preview-table.component';

describe('GardenPreviewTableComponent', () => {
  let component: GardenPreviewTableComponent;
  let fixture: ComponentFixture<GardenPreviewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardenPreviewTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenPreviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
