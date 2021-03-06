import { Injectable } from '@angular/core';
import {User, UserFull} from '../models/user';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {empty, throwError} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import {Globals} from '../models/globals';
import {MatSnackBar} from '@angular/material';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private readonly serverURL: string = 'https://uur.byu.edu/';
  // private serverURL = 'https://www.timpanogos-tech.com/scripts';
  // private serverURL = 'https://uur.byu.edu';
  private readonly loginURL: string;
  private readonly registerURL: string;
  private readonly addUserURL: string;
  private readonly dropUserURL: string;
  private readonly updateUserURL: string;
  private readonly changePasswordURL: string;

  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private isLoggedIn = false;

  // This constructor sets up some stuff for us
  constructor(private http: HttpClient, public jwt: JwtHelperService, private globals: Globals,
              public snackBar: MatSnackBar) {
    if (this.globals.server) {
      this.serverURL = globals.server;
    }

    this.loginURL = this.serverURL + 'api/login';
    this.registerURL = this.serverURL + 'api/register';
    this.addUserURL = this.serverURL + 'api/add_user';
    this.dropUserURL = this.serverURL + 'api/users/drop';
    this.updateUserURL = this.serverURL + 'api/user/update';
    this.changePasswordURL = this.serverURL + 'api/user/change_password';
  }

  // This function will log in the user
  login(user: User, callback: (success: boolean) => void) {
    let response: JSON;
    return this.http.post(this.loginURL, JSON.stringify(user)).pipe(retry(3), catchError(this.handleError)).subscribe((rep: JSON) => {
      response = rep;
      console.log(response);
      if (response['result'] === 'Success') {
        console.log('Successfully logged in');
        localStorage.setItem('auth_token', response['auth_token']);
        this.isLoggedIn = true;
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  // Checks to see if we have an item that is stored in the local storage
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    if (!token) { // Need to check if the token has been set first
      return false; // If the token hasn't been set that means we are not logged in
    }
    return !this.jwt.isTokenExpired(token);
  }

  public getRole(): string {
    const token = localStorage.getItem('auth_token');
    const payload = decode(token);
    return payload.sub['role'];
  }

  public getPrivilege(): string {
    const token = localStorage.getItem('auth_token');
    const payload = decode(token);
    return payload.sub['privilege'];
  }

  // This will attempt to register a new user TODO replace data with user type
  register(data) {
    console.log(this.registerURL);
    return this.http.post(this.registerURL, JSON.stringify(data)).pipe(catchError(this.handleError));
  }

  addUser(data) {
    console.log(this.addUserURL);
    console.log(data);
    return this.http.post(this.addUserURL, JSON.stringify(data)).pipe(catchError(this.handleError));
  }

  private addAuthenticationToken(data): any {
    console.log('Adding authentication token');
    const info = JSON.stringify(data);
    const additional = JSON.parse(info);
    additional['auth_token'] = localStorage.getItem('auth_token');
    return additional;
  }

  drop_user(id: number) {
    console.log('Attempting to remove user: ' + id);
    const data = {id: id};
    return this.http.post(this.dropUserURL, JSON.stringify(this.addAuthenticationToken(data))).pipe(catchError(this.handleError));
  }

  updateUser(user: UserFull) {
    console.log('Updating user: ' + user.id);
    return this.http.post(this.updateUserURL, JSON.stringify(this.addAuthenticationToken(user))).pipe(catchError(this.handleError));
  }

  changePassword(id: string, password: string) {
    console.log('Changing password');
    const data = {password: password, id: id};
    return this.http.post(this.changePasswordURL, JSON.stringify(this.addAuthenticationToken(data))).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // this.snackBar.open('Server Error: Try again later :(');
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
