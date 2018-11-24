import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {School, SchoolFull} from '../models/school';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {Observable, throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {
  // private server = 'https://uur.byu.edu/';
  private server = 'http://localhost:5000/';
  // private server = 'https://www.timpanogos-tech.com/scripts/';
  // private server = 'http://127.0.0.1:5000/';
  private schoolsimple = this.server + 'api/schools/simple';
  private schoolFullURL = this.server + 'api/schools/full';
  private getUsersSimpleURL = this.server + 'api/users/list';
  private registerURL = this.server + 'api/register';
  private registerSchoolURL = this.server + 'api/school/register';
  constructor(private http: HttpClient, public snackBar: MatSnackBar) { }

  getSchools() {
    console.log(this.schoolsimple);
    return this.http.get<School[]>(this.schoolsimple).pipe(catchError(this.handleError));
  }

  getSchoolFull(): Observable<any> {
    console.log(this.schoolFullURL);
    return this.http.get<SchoolFull[]>(this.schoolFullURL).pipe(catchError(this.handleError));
  }

  register(data) {
    console.log(this.registerURL);
    return this.http.post(this.registerURL, JSON.stringify(data)).pipe(catchError(this.handleError));
  }

  getUsers(): Observable<any> {
    console.log(this.getUsersSimpleURL);
    return this.http.get(this.getUsersSimpleURL).pipe(catchError(this.handleError));
  }

  registerSchool(school: SchoolFull): Observable<any> {
    console.log(this.registerSchoolURL);
    return this.http.post(this.registerSchoolURL, JSON.stringify(school)).pipe(catchError(this.handleError));
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
