import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes, CanActivate} from '@angular/router';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {MatSelectModule} from '@angular/material';
import {LoginViewComponent} from './views/login-view/login-view.component';
import {RegisterViewComponent} from './views/register-view/register-view.component';
import {AuthenticationGuard} from './services/authentication.guard';
import {SignUpComponent} from './forms/sign-up/sign-up.component';
import {DashboardMainComponent} from './views/dashboard-main/dashboard-main.component';
import {UsersComponent} from './views/users/users.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {path: '', redirectTo: 'v1', pathMatch: 'full'},
      {path: 'v1', component: DashboardMainComponent},
      {path: 'adduser', component: UsersComponent}
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
