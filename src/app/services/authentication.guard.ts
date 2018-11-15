import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticateService} from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(public auth: AuthenticateService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Guard: checking if authenticated');
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
    return true;
  }
}
