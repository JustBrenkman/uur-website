import { Component, OnInit } from '@angular/core';
import {MatIcon} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('auth_token');
    console.log('Logging out');
  }
}
