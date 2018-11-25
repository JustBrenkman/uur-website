import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserFull} from '../../models/user';
import {SchoolsService} from '../../services/schools.service';
import {EventbusService} from '../../services/eventbus.service';
import {SelectionModel} from '@angular/cdk/collections';
import {EmailDialogComponent} from '../../forms/email-dialog/email-dialog.component';

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
  showSelect = false;
  usersDisplayColumn: string[] = ['timestamp', 'id', 'first_name', 'last_name', 'email', 'school', 'role', 'privilege'];
  selection = new SelectionModel<UserFull>(true, []);
  displayActions = false;


  constructor(public schoolService: SchoolsService,
              public eventbus: EventbusService,
              public dialog: MatDialog,) {

  }

  ngOnInit() {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
    this.getUsers();
    this.eventbus.of('viewSelect').subscribe((message: boolean) => {
      if (message) {
        this.usersDisplayColumn.push('select');
      } else if (this.usersDisplayColumn.filter(item => item === 'select')) {
        this.usersDisplayColumn.pop();
      }
    });
    this.eventbus.of('viewActions').subscribe((data: boolean) => {
      this.displayActions = data;
    });
  }

  getUsers() {
    this.isLoadingIUsers = true;
    this.schoolService.getUsers().subscribe((data: UserFull[]) => {
      this.users = data;
      this.usersDataSource.data = this.users;
      this.isLoadingIUsers = false;
    });
  }

  openEmailDialog() {
    const list = this.selection.selected;
    const emailList: string[] = [];
    list.forEach(item => {
      emailList.push(item.email);
    });
    const dialogRef = this.dialog.open(EmailDialogComponent, {data: emailList});
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.usersDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.usersDataSource.data.forEach(row => this.selection.select(row));
  }
}
