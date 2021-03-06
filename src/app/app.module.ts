import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {JwtModule} from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { LoginComponent } from './forms/login/login.component';
import { SignUpComponent } from './forms/sign-up/sign-up.component';
import { LandingComponent } from './views/landing/landing.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';

import {NgxMaskModule} from 'ngx-mask';
import {A11yModule} from '@angular/cdk/a11y';

import {ChartsModule} from 'ng2-charts';

import {
  MatSelectModule,
  MatCheckboxModule,
  MatButtonModule,
  MatInputModule,
  ShowOnDirtyErrorStateMatcher,
  ErrorStateMatcher,
  MatMenuModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatDividerModule,
  MatRadioModule,
  MatSnackBarModule,
  MatIconModule,
  MatSidenavModule,
  MatGridListModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatBadgeModule,
  MatTabsModule,
  MatStepperModule,
  MatRippleModule,
  MatDatepickerModule,
  MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef, MAT_DIALOG_DATA, MatDatepicker
} from '@angular/material';

import {
  DragDropModule
} from '@angular/cdk/drag-drop';

import {HttpClientModule} from '@angular/common/http';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { RegisterViewComponent } from './views/register-view/register-view.component';
import {AuthenticateService} from './services/authenticate.service';
import { DashboardMainComponent } from './views/dashboard-main/dashboard-main.component';
import { UsersComponent } from './views/users/users.component';
import { JudgesComponent } from './views/judges/judges.component';
import { CompetitionComponent } from './views/competition/competition.component';
import { SchoolsComponent } from './views/schools/schools.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AddUserFormComponent } from './forms/add-user-form/add-user-form.component';
import { TeamsComponent } from './views/teams/teams.component';
import { TutorialsComponent } from './views/tutorials/tutorials.component';
import { ChartComponent } from './components/chart/chart.component';
import { RegisterSchoolDialogComponent } from './forms/register-school-dialog/register-school-dialog.component';
import { EmailDialogComponent } from './forms/email-dialog/email-dialog.component';
import {Globals} from './models/globals';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { EditUserDialogComponent } from './dialogs/edit-user-dialog/edit-user-dialog.component';
import { AddTeamDialogComponent } from './dialogs/add-team-dialog/add-team-dialog.component';
import {TeamService} from './services/team.service';
import { TeamProfileComponent } from './views/team-profile/team-profile.component';
import { EditTeamInfoDialogComponent } from './dialogs/edit-team-info-dialog/edit-team-info-dialog.component';
import { CompetitionCreateComponent } from './views/competition-create/competition-create.component';

import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import {CompetitionInfoComponent, FloorPipe} from './views/competition-info/competition-info.component';
import { RegisterTeamCompetitionComponent } from './views/register-team-competition/register-team-competition.component';
import { JudgeTeamComponent } from './views/judge-team/judge-team.component';
import { JudgeTeamViewComponent } from './views/judge-team-view/judge-team-view.component';

export function getToken() {
  return localStorage.getItem('auth_token');
}

@NgModule({
  declarations: [
    AppComponent,
    // NavigationComponent,
    LoginComponent,
    SignUpComponent,
    LandingComponent,
    DashboardComponent,
    LoginViewComponent,
    RegisterViewComponent,
    DashboardMainComponent,
    UsersComponent,
    JudgesComponent,
    CompetitionComponent,
    SchoolsComponent,
    AddUserFormComponent,
    TeamsComponent,
    TutorialsComponent,
    ChartComponent,
    RegisterSchoolDialogComponent,
    EmailDialogComponent,
    ConfirmationDialogComponent,
    EditUserDialogComponent,
    AddTeamDialogComponent,
    TeamProfileComponent,
    EditTeamInfoDialogComponent,
    CompetitionCreateComponent,
    CompetitionInfoComponent,
    RegisterTeamCompetitionComponent,
    JudgeTeamComponent,
    JudgeTeamViewComponent,
    FloorPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatDividerModule,
    MatSnackBarModule,
    MatIconModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatBadgeModule,
    MatTabsModule,
    MatStepperModule,
    MatRippleModule,
    NgxMaskModule.forRoot(),
    A11yModule,
    ChartsModule,
    HttpClientModule,
    AppRoutingModule,
    DragDropModule,
    MatDatepickerModule,
    MatDatetimepickerModule,
    // MatNativeDateModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: [],
        blacklistedRoutes: []
        }
      })
  ],
  exports: [],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    AuthenticateService, Globals, TeamService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ],
  entryComponents: [AddUserFormComponent, RegisterSchoolDialogComponent, EmailDialogComponent, ConfirmationDialogComponent,
  EditUserDialogComponent, AddTeamDialogComponent, EditTeamInfoDialogComponent]
})
export class AppModule { }
