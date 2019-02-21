import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes, CanActivate} from '@angular/router';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {MatSelectModule} from '@angular/material';
import {LoginViewComponent} from './views/login-view/login-view.component';
import {RegisterViewComponent} from './views/register-view/register-view.component';
import {AuthenticationGuard} from './services/authentication.guard';
import {DashboardMainComponent} from './views/dashboard-main/dashboard-main.component';
import {UsersComponent} from './views/users/users.component';
import {JudgesComponent} from './views/judges/judges.component';
import {CompetitionComponent} from './views/competition/competition.component';
import {SchoolsComponent} from './views/schools/schools.component';
import {TeamsComponent} from './views/teams/teams.component';
import {RolePrivilegeGuard} from './services/role-privilege-guard.service';
import {TutorialsComponent} from './views/tutorials/tutorials.component';
import {TeamProfileComponent} from './views/team-profile/team-profile.component';
import {CompetitionCreateComponent} from './views/competition-create/competition-create.component';
import {CompetitionInfoComponent} from './views/competition-info/competition-info.component';
import {RegisterTeamCompetitionComponent} from './views/register-team-competition/register-team-competition.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {path: '', redirectTo: 'v1', pathMatch: 'full'},
      {path: 'v1', component: DashboardMainComponent, canActivate: [AuthenticationGuard]},
      {path: 'users', component: UsersComponent, canActivate: [RolePrivilegeGuard], data: {privilege: 'admin'}},
      {path: 'judges', component: JudgesComponent, canActivate: [RolePrivilegeGuard], data: {privilege: 'admin', role: 'Other'}},
      {path: 'competition', component: CompetitionComponent, canActivate: [AuthenticationGuard]},
      {path: 'competition/create', component: CompetitionCreateComponent, canActivate: [AuthenticationGuard]},
      {path: 'competition/info', component: CompetitionInfoComponent, canActivate: [RolePrivilegeGuard], data: {privilege: 'member', role: 'Director'}},
      {path: 'competition/register', component: RegisterTeamCompetitionComponent, canActivate: [RolePrivilegeGuard], data: {privilege: 'member'}},
      {path: 'schools', component: SchoolsComponent, canActivate: [RolePrivilegeGuard], data: {privilege: 'admin'}},
      {path: 'teams', component: TeamsComponent, canActivate: [RolePrivilegeGuard], data: {privilege: 'member', role: 'Teacher'}},
      {path: 'teams/team/:id', component: TeamProfileComponent, canActivate: [AuthenticationGuard]},
      {path: 'tutorials', component: TutorialsComponent, canActivate: [AuthenticationGuard]},
      {path: '404', redirectTo: 'v1'}
    ]
  },
  // {path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard]},
  {path: 'login', component: LoginViewComponent},
  {path: 'register', component: RegisterViewComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatSelectModule
  ],
  exports: [RouterModule, MatSelectModule],
  declarations: []
})
export class AppRoutingModule { }
