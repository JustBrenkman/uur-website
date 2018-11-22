import { Component, OnInit } from '@angular/core';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {RolePrivilegeGuard} from '../../services/role-privilege-guard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  _mobileQueryListener: () => void;
  expand: boolean;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public roleGuard: RolePrivilegeGuard) {
    this.mobileQuery = media.matchMedia('(max-width: 600px');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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

  toggleSidebar() {
    console.log('Toggling sidebar');
  }

  privilegeGuard(role: string): boolean {
    return this.roleGuard.privilegeGuard(role);
  }
}
