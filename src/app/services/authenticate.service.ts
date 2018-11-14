import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {empty, throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private serverURL = 'http://127.0.0.1:5000/';
  // private serverURL = 'https://www.timpanogos-tech.com';
  private loginURL = this.serverURL + '/scripts/api/login';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private auth_token: JSON;
  private isLoggedIn = false;

  constructor(private http: HttpClient) { }

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

  isloggedin(): boolean {
    return this.isLoggedIn;
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
