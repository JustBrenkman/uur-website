import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, throwError} from 'rxjs';
import * as socketIo from 'socket.io-client';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

export enum Event {
  CONNECTED = 'connect',
  DISCONNECTED = 'disconnected',
  ERROR = 'error'
}

export enum Status {
  CONNECTED = 'Connected',
  CONNECTING = 'Connecting',
  DISCONNECTED = 'Disconnected'
}

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {

  private socket;
  // private serverURL = 'https://uur.byu.edu';
  private serverURL = 'http://localhost:5000';

  constructor(private http: HttpClient, public jwt: JwtHelperService) { }

  public status: Status;

  ngOnInit() {
    this.status = Status.DISCONNECTED;
  }

  initSocketConnection() {
    this.status = Status.CONNECTING;
    this.socket = socketIo(this.serverURL);
    this.onEvent(Event.CONNECTED).subscribe(() => {
      this.status = Status.CONNECTED;
    });
    this.onEvent(Event.DISCONNECTED).subscribe(() => {
      this.status = Status.DISCONNECTED;
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  public onMessageRecieved(): Observable<any> {
    return new Observable<string>(observer => {
      this.socket.on('message', (data: string) => observer.next(data));
    });
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

  disconnect() {
    this.socket.disconnect();
    this.status = Status.DISCONNECTED;
  }
}
