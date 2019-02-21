import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTeamCompetitionComponent } from './register-team-competition.component';

describe('RegisterTeamCompetitionComponent', () => {
  let component: RegisterTeamCompetitionComponent;
  let fixture: ComponentFixture<RegisterTeamCompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTeamCompetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTeamCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
