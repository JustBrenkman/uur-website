import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  // private server = 'https://www.timpanogos-tech.com';
  private server = 'http://127.0.0.1:5000/';
  private heroesUrl = this.server + '/scripts/schools';
  private schoolsimple = this.server + '/scripts/api/schools/simple';
  private registerURL = this.server + '/scripts/api/register';
  private loginURL = this.server + '/scripts/api/login';

  serverData: JSON;

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(this.loginURL, JSON.stringify(data)).pipe(catchError(this.handleError));
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
