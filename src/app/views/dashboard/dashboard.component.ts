import { Component, OnInit } from '@angular/core';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {RolePrivilegeGuard} from '../../services/role-privilege-guard.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {AddUserFormComponent} from '../../forms/add-user-form/add-user-form.component';
import {UsersComponent} from '../users/users.component';
import {RegisterSchoolDialogComponent} from '../../forms/register-school-dialog/register-school-dialog.component';

export enum DASHBOARD {
  V1,
  TEAMS,
  SCHOOLS,
  COMPETITION,
  JUDGES,
  SETTINGS,
  USERS
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  _mobileQueryListener: () => void;
  expand: boolean;
  dashboard: DASHBOARD;
  DASHBOARD: any = DASHBOARD;


  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              public roleGuard: RolePrivilegeGuard,
              public router: Router,
              public dialog: MatDialog) {

    this.mobileQuery = media.matchMedia('(max-width: 600px');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // This beautiful bunch of code helps the dashboard now what component is showing. So we can can modify the menu that shows
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((data) => {
      if ((data['url'] as string).indexOf('v1') > 0) {
        this.dashboard = DASHBOARD.V1;
      } else if (data['url'].indexOf('teams') > 0) {
        this.dashboard = DASHBOARD.TEAMS;
      } else if (data['url'].indexOf('schools') > 0) {
        this.dashboard = DASHBOARD.SCHOOLS;
      } else if (data['url'].indexOf('judges') > 0) {
        this.dashboard = DASHBOARD.JUDGES;
      } else if (data['url'].indexOf('settings') > 0) {
        this.dashboard = DASHBOARD.SETTINGS;
      } else if (data['url'].indexOf('users') > 0) {
        this.dashboard = DASHBOARD.USERS;
      } else if (data['url'].indexOf('competition') > 0) {
        this.dashboard = DASHBOARD.COMPETITION;
      } else {
        this.dashboard = DASHBOARD.V1;
      }
    });
  }

  ngOnInit() {
    this.expand = false;
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    localStorage.removeItem('auth_token');
    console.log('Logging out');
    location.reload();
  }

  privilegeGuard(role: string): boolean {
    return this.roleGuard.privilegeGuard(role);
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // this.users.getUsers();
    });
  }

  openRemoveUserDialog() {

  }

  openAddSchoolDialog() {
    const dialogRef = this.dialog.open(RegisterSchoolDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openRemoveSchoolDialog() {

  }
}
