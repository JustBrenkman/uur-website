import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {empty, throwError} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import decode from 'jwt-decode';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private serverURL = 'http://127.0.0.1:5000';
  // private serverURL = 'https://www.timpanogos-tech.com/scripts';
  // private serverURL = 'https://uur.byu.edu';
  private loginURL = this.serverURL + '/api/login';
  private registerURL = this.serverURL + '/api/register';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private auth_token: JSON;
  private isLoggedIn = false;

  // This constructor sets up some stuff for us
  constructor(private http: HttpClient, public jwt: JwtHelperService) { }

  // This function will log in the user
  login(user: User, callback: (success: boolean) => void) {
    let response: JSON;
    return this.http.post(this.loginURL, JSON.stringify(user)).pipe(catchError(this.handleError)).subscribe((rep: JSON) => {
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

  private handleError(error: HttpErrorResponse) {
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
