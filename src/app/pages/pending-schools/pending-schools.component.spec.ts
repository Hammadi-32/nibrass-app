import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingSchoolsComponent } from './pending-schools.component';

describe('PendingSchoolsComponent', () => {
  let component: PendingSchoolsComponent;
  let fixture: ComponentFixture<PendingSchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingSchoolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
