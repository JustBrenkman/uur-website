import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { LoginComponent } from './forms/login/login.component';
import { SignUpComponent } from './forms/sign-up/sign-up.component';
import { LandingComponent } from './views/landing/landing.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';

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
  MatIconModule
} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { RegisterViewComponent } from './views/register-view/register-view.component';
import {AuthenticateService} from './services/authenticate.service';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
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
    HttpClientModule,
    AppRoutingModule,
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
    AuthenticateService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
