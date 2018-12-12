import {Injectable} from '@angular/core';
import {Globals} from '../models/globals';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthenticateService} from './authenticate.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Team} from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly serverURL: string = 'https://uur.byu.edu/';
  // private serverURL = 'https://www.timpanogos-tech.com/scripts';
  // private serverURL = 'https://uur.byu.edu';
  private readonly generateNewTeamNumberURL: string;
  private readonly addTeamURL: string;
  private readonly getTeamListURL: string;

  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(public globals: Globals, public http: HttpClient, public jwt: JwtHelperService, public authService: AuthenticateService) {
    if (this.globals.server) {
      this.serverURL = globals.server;
    }

    this.generateNewTeamNumberURL = this.serverURL + 'api/teams/generate_number';
    this.addTeamURL = this.serverURL + 'api/teams/add_team';
    this.getTeamListURL = this.serverURL + 'api/team/get_list_teams';
  }

  generateTeamNumber(): Observable<any> {
    if (this.authService.isAuthenticated()) {
      return this.http.post(this.generateNewTeamNumberURL, {auth_token: localStorage.getItem('auth_token')});
    }
    // return{'result': 'failed', 'message': 'Not Authenticated'};
  }

  addTeam(team_number: string, team_name: string): Observable<any> {
    if (this.authService.isAuthenticated()) {
      const data = {team_number: team_number, team_name: team_name};
      return this.http.post(this.addTeamURL, Globals.addAuthenticationToken(data)).pipe(catchError(this.handleError));
    }
  }

  getTeamListUser(): Observable<Team[]> {
    return this.http.post<Team[]>(this.getTeamListURL, {auth_token: localStorage.getItem('auth_token')}).pipe(catchError(this.handleError));
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
