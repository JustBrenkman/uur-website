import { Injectable } from '@angular/core';
import {Email, EmailServer} from '../models/email';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {concat, throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {Globals} from '../models/globals';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  // private server = 'https://uur.byu.edu/';
  // private server = 'http://localhost:5000/';
  server = 'https://uur.byu.edu/';
  private emailURL: string;

  constructor(public http: HttpClient, public snackBar: MatSnackBar, private globals: Globals) {
    if (globals.server) {
      this.server = globals.server;
    }
    this.emailURL = this.server + 'api/email';
  }

  sendEmail(emailcontent: Email): Observable<any> {
    console.log(this.emailURL);
    const items = JSON.stringify(emailcontent);
    const additional = JSON.parse(items);
    additional['auth_token'] = localStorage.getItem('auth_token');
    console.log(additional);
    return this.http.post(this.emailURL, JSON.stringify(additional)).pipe(catchError(this.handleError));
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
    this.snackBar.open('An Error occurred with the server, please try again later');
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
