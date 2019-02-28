import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeTeamComponent } from './judge-team.component';

describe('JudgeTeamComponent', () => {
  let component: JudgeTeamComponent;
  let fixture: ComponentFixture<JudgeTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
