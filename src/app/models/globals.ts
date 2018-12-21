import {Injectable} from '@angular/core';
import saveAs from 'file-saver';
import {UserFull} from './user';
import {SchoolFull} from './school';
import {Team} from './team';

@Injectable()
export class Globals {
  // server: string = 'https://uur.byu.edu/';
  server: string = 'http://localhost:5000/';
  users_viewSelect: boolean = false;

  // Views component
  view_users_show_actions: boolean = false;

  users: UserFull[];
  schools: SchoolFull[];
  teams: Team[];
  teamsAdmin: Team[];

  static downloadFile(data: any, filename: string) {
    const blob = new Blob([data.toString()], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, filename);
    // const url = window.URL.createObjectURL(blob);
    // window.open(url);
  }

  public static addAuthenticationToken(data): any {
    console.log('Adding authentication token');
    const info = JSON.stringify(data);
    const additional = JSON.parse(info);
    additional['auth_token'] = localStorage.getItem('auth_token');
    return additional;
  }
}
