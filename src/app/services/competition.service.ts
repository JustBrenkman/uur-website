import { Injectable } from '@angular/core';
import {Globals} from '../models/globals';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthenticateService} from './authenticate.service';
import {Observable, throwError} from 'rxjs';
import {Competition, CreateCompetition} from '../models/competition';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private readonly serverURL: string = 'https://uur.byu.edu/';
  private readonly getCompetitonListFullURL: string;
  private readonly createCompetitionURL: string;

  constructor(public globals: Globals, public http: HttpClient, public jwt: JwtHelperService, public authService: AuthenticateService) {
    if (this.globals.server) {
      this.serverURL = globals.server;
    }
    this.getCompetitonListFullURL = this.serverURL + 'api/competition/get_full_list';
    this.createCompetitionURL = this.serverURL + 'api/competition/create_new_competition';
  }

  getFullList(): Observable<Competition[]> {
    return this.http.post<Competition[]>(this.getCompetitonListFullURL, {auth_token: localStorage.getItem('auth_token')})
      .pipe(catchError(this.handleError));
  }

  createNewCompetition(comp: CreateCompetition): Observable<any> {
    return this.http.post(this.createCompetitionURL, JSON.stringify(comp)).pipe(catchError(this.handleError));
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
