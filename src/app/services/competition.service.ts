import { Injectable } from '@angular/core';
import {Globals} from '../models/globals';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthenticateService} from './authenticate.service';
import {Observable, throwError} from 'rxjs';
import {Action, Competition, CreateCompetition, Score, Scoreboard, Task, TaskScores} from '../models/competition';
import {catchError} from 'rxjs/operators';
import {Team} from '../models/team';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private readonly serverURL: string = 'https://uur.byu.edu/';
  private readonly getCompetitonListFullURL: string;
  private readonly createCompetitionURL: string;
  private readonly getCompetitionInfoURL: string;
  private readonly getTasksURL: string;
  private readonly getActionsURL: string;
  private readonly getUpcomingCompsURL: string;
  private readonly openRegURL: string;
  private readonly closeRegURL: string;
  private readonly getRegisteredTeamsURL: string;
  private readonly getUnregisteredTeamsURL: string;
  private readonly registerTeamURL: string;
  private readonly cancelRegistrationURL: string;
  private readonly getAllRegisteredTeamsURL: string;
  private readonly addScoreToTeamURL: string;
  private readonly getScoreBoardURL: string;

  constructor(public globals: Globals, public http: HttpClient, public jwt: JwtHelperService, public authService: AuthenticateService) {
    if (this.globals.server) {
      this.serverURL = globals.server;
    }
    this.getCompetitonListFullURL = this.serverURL + 'api/competition/get_full_list';
    this.createCompetitionURL = this.serverURL + 'api/competition/create_new_competition';
    this.getCompetitionInfoURL = this.serverURL + 'api/competition/get_info';
    this.getTasksURL = this.serverURL + 'api/competition/get_tasks';
    this.getActionsURL = this.serverURL + 'api/competition/get_actions';
    this.getUpcomingCompsURL = this.serverURL + 'api/competition/get_upcoming';
    this.openRegURL = this.serverURL + 'api/competition/open_for_registration';
    this.closeRegURL = this.serverURL + 'api/competition/close_registration';
    this.getRegisteredTeamsURL = this.serverURL + 'api/competition/get_registered_teams';
    this.getUnregisteredTeamsURL = this.serverURL + 'api/competition/get_unregistered_teams';
    this.registerTeamURL = this.serverURL + 'api/competition/register_team';
    this.cancelRegistrationURL = this.serverURL + 'api/competition/cancel_registration';
    this.getAllRegisteredTeamsURL = this.serverURL + 'api/competition/get_all_registered_teams';
    this.addScoreToTeamURL = this.serverURL + 'api/competition/add_score_to_team';
    this.getScoreBoardURL = this.serverURL + 'api/competition/get_score_board';
  }

  getFullList(): Observable<Competition[]> {
    return this.http.post<Competition[]>(this.getCompetitonListFullURL, {auth_token: localStorage.getItem('auth_token')})
      .pipe(catchError(this.handleError));
  }

  createNewCompetition(comp: CreateCompetition): Observable<any> {
    return this.http.post(this.createCompetitionURL, JSON.stringify(comp)).pipe(catchError(this.handleError));
  }

  getCompetitionInfo(id: number): Observable<Competition> {
    return this.http.post<Competition>(this.getCompetitionInfoURL, {id: id}).pipe(catchError(this.handleError));
  }

  getTasks(id: number): Observable<Task[]> {
    return this.http.post<Task[]>(this.getTasksURL, {id: id}).pipe(catchError(this.handleError));
  }

  getActions(id: number): Observable<Action[]> {
    return this.http.post<Action[]>(this.getActionsURL, {id: id}).pipe(catchError(this.handleError));
  }

  getUpcomingCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.getUpcomingCompsURL).pipe(catchError(this.handleError));
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

  openRegistration(id: number): Observable<Boolean> {
    return this.http.post<Boolean>(this.openRegURL, {id: id}).pipe(catchError(this.handleError));
  }

  closeRegistration(id: number): Observable<Boolean> {
    return this.http.post<Boolean>(this.closeRegURL, {id: id}).pipe(catchError(this.handleError));
  }

  getRegisterdTeams(comp_id: number): Observable<Team[]> {
    // const header = new HttpHeaders().set('auth_token', localStorage.getItem('auth_token'));
    const token = localStorage.getItem('auth_token');
    const payload = decode(token);
    const school_abr = payload.sub['school'];
    return this.http.post<Team[]>(this.getRegisteredTeamsURL, {id: comp_id, school_abr: school_abr}).pipe(catchError(this.handleError));
  }

  getUnregisteredTeams(comp_id: number): Observable<Team[]> {
    const token = localStorage.getItem('auth_token');
    const payload = decode(token);
    const school_abr = payload.sub['school'];
    return this.http.post<Team[]>(this.getUnregisteredTeamsURL, {id: comp_id, school_abr: school_abr}).pipe(catchError(this.handleError));
  }

  registerTeam(comp_id: number, team_number: string): Observable<Boolean> {
    return this.http.post<Boolean>(this.registerTeamURL, {id: comp_id, team_number: team_number}).pipe(catchError(this.handleError));
  }

  cancelRegistration(id: number, team_number: string) {
    return this.http.post<Boolean>(this.cancelRegistrationURL, {id: id, team_number: team_number}).pipe(catchError(this.handleError));
  }

  getAllRegisteredTeams(id: number): Observable<Team[]> {
    return this.http.post<Team[]>(this.getAllRegisteredTeamsURL, {id: id}).pipe(catchError(this.handleError));
  }

  addScoreToTeam(team_number: string, comp_id: number, task_scores: TaskScores): Observable<Boolean> {
    return this.http.post<Boolean>(this.addScoreToTeamURL, {id: comp_id, team_number: team_number, task_scores: task_scores}).pipe(catchError(this.handleError));
  }

  getScoreBoard(comp_id: number): Observable<Scoreboard[]> {
    return this.http.post<Scoreboard[]>(this.getScoreBoardURL, {id: comp_id}).pipe(catchError(this.handleError));
  }

  startTimer(timer: number): Observable<any> {
    return this.http.post(this.serverURL + 'competition/start_timer', {timer: timer}).pipe(catchError(this.handleError));
  }

  stopTimer(): Observable<any> {
    return this.http.get(this.serverURL + 'competition/stop_timer').pipe(catchError(this.handleError));
  }

  connectToEventSource(): EventSource {
    return new EventSource(this.serverURL + 'competition_events');
  }

  getEventStream(): Observable<Map<String, any>> {
    return new Observable<Map<String, any>>(obs => {
      const es = new EventSource(this.serverURL + 'competition_events');
      es.onmessage = function(e) {
        obs.next(JSON.parse(e.data));
      };
      // es.addEventListener('data', (event) => {
      //   console.log(event);
      //   // obs.next(event);
      //   obs.next('message');
      // });
      return () => es.close();
    });
  }
}

