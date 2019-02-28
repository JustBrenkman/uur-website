import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeTeamViewComponent } from './judge-team-view.component';

describe('JudgeTeamViewComponent', () => {
  let component: JudgeTeamViewComponent;
  let fixture: ComponentFixture<JudgeTeamViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeTeamViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeTeamViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
