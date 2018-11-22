import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router} from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';
import {AuthenticateService} from './authenticate.service';

// This is the enums of all the different type
// The order MATTERS!!!!
export enum privileges {
  ADMIN = 'admin',
  MEMBER = 'member',
  VIEWER = 'viewer'
}

@Injectable({
  providedIn: 'root'
})
export class RolePrivilegeGuard implements CanActivate {

  constructor(public router: Router, public auth: AuthenticateService) { }

  static stringToEnum(data: string) {
    switch (data) {
      case 'admin': {
        return privileges.ADMIN;
      }
      case 'member': {
        return privileges.MEMBER;
      }
      case 'viewer': {
        return privileges.VIEWER;
      }
      default: {
        return privileges.VIEWER;
      }
    }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('RolePrivilege Guard: Checking role and privilege');
    const expectedPrivilege = next.data.privilege;
    const expectedRole = next.data.role;
    const token = localStorage.getItem('auth_token');
    const payload = decode(token);
    // console.log('Checking role and privilege: ' + payload.sub['privilege'] + ', ' + expectedPrivilege);
    // console.log('Check: admin > viewer? ' + privileges.ADMIN > privileges.VIEWER);
    // console.log('Authenticated: ' + this.auth.isAuthenticated());
    // console.log('Privilege: ' + (this.stringToEnum(payload.sub['privilege']) <= this.stringToEnum(expectedPrivilege)));
    // console.log('Role: ' + (expectedRole === payload.sub['role']));
    if (this.auth.isAuthenticated() &&
      (RolePrivilegeGuard.stringToEnum(payload.sub['privilege']) <= RolePrivilegeGuard.stringToEnum(expectedPrivilege))
      || (expectedRole === payload.sub['role'])) {

      return true;
    } else {
      this.router.navigate(['dashboard']);

      return false;
    }
  }

  // Checks to see if the currently signed in user has the minimum privileges
  privilegeGuard(privilege: string): boolean {
    const token = localStorage.getItem('auth_token');
    const payload = decode(token);

    return RolePrivilegeGuard.stringToEnum(payload.sub['privilege']) <= RolePrivilegeGuard.stringToEnum(privilege);
  }

  // Checks whether the currently signed in user matches the role or not
  roleGuard(role: string) {
    const token = localStorage.getItem('auth_token');
    const payload = decode(token);

    return payload.sub['role'] === role;
  }
}
