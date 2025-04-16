import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareRemindersTableComponent } from './care-reminders-table.component';

describe('CareRemindersTableComponent', () => {
  let component: CareRemindersTableComponent;
  let fixture: ComponentFixture<CareRemindersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareRemindersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareRemindersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
