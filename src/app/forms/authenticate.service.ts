import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

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
}
