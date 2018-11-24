import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserFull} from '../../models/user';
import {SchoolsService} from '../../services/schools.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  users: UserFull[] = [];
  usersDataSource = new MatTableDataSource(this.users);
  isLoadingIUsers = false;
  usersDisplayColumn: string[] = ['timestamp', 'id', 'first_name', 'last_name', 'email', 'school', 'role', 'privilege'];


  constructor(public schoolService: SchoolsService) {

  }

  ngOnInit() {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
    this.getUsers();
  }

  getUsers() {
    this.isLoadingIUsers = true;
    this.schoolService.getUsers().subscribe((data: UserFull[]) => {
      console.log(data);
      this.users = data;
      this.usersDataSource.data = this.users;
      this.isLoadingIUsers = false;
    });
  }

}
