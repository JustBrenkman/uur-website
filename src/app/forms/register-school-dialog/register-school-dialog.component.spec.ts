import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSchoolDialogComponent } from './register-school-dialog.component';

describe('RegisterSchoolDialogComponent', () => {
  let component: RegisterSchoolDialogComponent;
  let fixture: ComponentFixture<RegisterSchoolDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSchoolDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSchoolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
