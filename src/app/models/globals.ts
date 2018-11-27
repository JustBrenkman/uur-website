import {Injectable} from '@angular/core';
import saveAs from 'file-saver';
import {UserFull} from './user';
import {SchoolFull} from './school';

@Injectable()
export class Globals {
  server: string = 'https://uur.byu.edu/';
  // server: string = 'http://localhost:5000/';
  users_viewSelect: boolean = false;

  // Views component
  view_users_show_actions: boolean = false;

  users: UserFull[];
  schools: SchoolFull[];

  static downloadFile(data: any, filename: string) {
    const blob = new Blob([data.toString()], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, filename);
    // const url = window.URL.createObjectURL(blob);
    // window.open(url);
  }
}
