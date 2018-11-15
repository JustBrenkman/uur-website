import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes, CanActivate} from '@angular/router';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {MatSelectModule} from '@angular/material';
import {LoginViewComponent} from './views/login-view/login-view.component';
import {RegisterViewComponent} from './views/register-view/register-view.component';
import {AuthenticationGuard} from './services/authentication.guard';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthenticationGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard]},
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
