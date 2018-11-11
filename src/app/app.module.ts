import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
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
  ErrorStateMatcher
} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    SignUpComponent,
    LandingComponent,
    DashboardComponent,
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
    HttpClientModule,
    AppRoutingModule,
  ],
  exports: [],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent, NavigationComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
