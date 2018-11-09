import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {School} from './school';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {
  private heroesUrl = 'https://www.timpanogos-tech.com/scripts/schools';
  constructor(private http: HttpClient) { }
  serverData: JSON;
  school: School;

  getSchool(): Observable<School> {
    // this.http.get('https://www.timpanogos-tech.com/scripts/schools').subscribe((school: School) => this.school = {
    //   abr: school['abr'],
    //   name: school['name']
    // });
    return this.http.get<School>('https://www.timpanogos-tech.com/scripts/schools').pipe(catchError(this.handleError));
  }

  getTest(): void {
    this.http.get('https://www.timpanogos-tech.com/scripts/schools').pipe(catchError(this.handleError))
      .subscribe((data: JSON) => {this.serverData = data as JSON;
        console.log(this.serverData);
      });
  }

  getSchools() {
    console.log('Retrieving schools');
    return this.http.get<School[]>(this.heroesUrl).pipe(catchError(this.handleError));
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
