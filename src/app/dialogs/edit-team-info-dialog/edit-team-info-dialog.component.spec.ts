import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamInfoDialogComponent } from './edit-team-info-dialog.component';

describe('EditTeamInfoDialogComponent', () => {
  let component: EditTeamInfoDialogComponent;
  let fixture: ComponentFixture<EditTeamInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTeamInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
