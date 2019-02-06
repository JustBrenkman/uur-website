import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {UserFull} from '../../models/user';
import {SchoolsService} from '../../services/schools.service';
import {EventbusService} from '../../services/eventbus.service';
import {SelectionModel} from '@angular/cdk/collections';
import {EmailDialogComponent} from '../../forms/email-dialog/email-dialog.component';
import {Globals} from '../../models/globals';
import {ConfirmationDialogComponent} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {AuthenticateService} from '../../services/authenticate.service';
import {EditUserDialogComponent} from '../../dialogs/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  usersDataSource = new MatTableDataSource(this.globals.users);
  isLoadingIUsers = false;
  showSelect = false;
  usersDisplayColumn: string[] = ['timestamp', 'id', 'first_name', 'last_name', 'email', 'school', 'role', 'privileges', 'last_log_in', 'actions'];
  selection = new SelectionModel<UserFull>(true, []);
  displayActions = false;

  // Chart stuff goes here
  public userChartData: Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Users per month'},
  ];
  public userChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  public userChartOptions: any = {
    responsive: true,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };
  // public userChartColors: Array<any> = [
  //   { // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   }
  // ];
  public userChartLegend = true;
  public userChartType = 'line';

  public activeUserChartData: Array<any> = [
    {data: [1, 2]}
  ];
  public pieChartLabels: string[] = ['Inactive', 'Active'];
  public activeUserChartType = 'pie';

  constructor(public schoolService: SchoolsService,
              public eventbus: EventbusService,
              public dialog: MatDialog,
              public globals: Globals,
              public snackbar: MatSnackBar,
              public authService: AuthenticateService) {

  }

  ngOnInit() {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
    if (!this.globals.users) {
      this.getUsers();
    } else {
      this.usersDataSource.data = this.globals.users;
      this.updateUserInfoTable(this.globals.users);
    }
    this.eventbus.of('viewSelect').subscribe((message: boolean) => {
      if (message) {
        this.usersDisplayColumn.push('select');
      } else {
        this.usersDisplayColumn.forEach(item => {
          if (item === 'select') {
            this.usersDisplayColumn.pop();
          }
        });
      }
    });
    this.eventbus.of('viewActions').subscribe((data: boolean) => {
      this.displayActions = data;
    });
  }

  getUsers() {
    this.isLoadingIUsers = true;
    this.schoolService.getUsers().subscribe((data: UserFull[]) => {
      this.globals.users = data;
      this.usersDataSource.data = this.globals.users;
      this.isLoadingIUsers = false;
      this.updateUserInfoTable(data);
    });
  }

  updateUserInfoTable(data: UserFull[]) {
    let Jan = 0, Feb = 0, Mar = 0, Apr = 0, May = 0, Jun = 0, Jul = 0, Aug = 0, Sep = 0, Oct = 0, Nov = 0, Dec = 0;
    let active = 0;
    let inactive = 0;
    data.forEach(time => {
      const year = new Date(Date.now()).getFullYear();
      if (time.status === 'active') {
        active++;
      } else {
        inactive++;
      }
      if (new Date(time.timestamp).getFullYear() === year) {
        const date = new Date(time.timestamp).getMonth();
        switch (date) {
          case 0:
            Jan++;
            break;
          case 1:
            Feb++;
            break;
          case 2:
            Mar++;
            break;
          case 3:
            Apr++;
            break;
          case 4:
            May++;
            break;
          case 5:
            Jun++;
            break;
          case 6:
            Jul++;
            break;
          case 7:
            Aug++;
            break;
          case 8:
            Sep++;
            break;
          case 9:
            Oct++;
            break;
          case 10:
            Nov++;
            break;
          case 11:
            Dec++;
            break;
        }
      }
    });
  this.userChartData = [
      {data: [Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec], label: 'Users joined'},
    ];
  this.activeUserChartData = [{ data: [inactive, active]}];
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

  doanloadSelectionEmail() {
    const list = this.selection.selected;
    const emailList: string[] = [];
    list.forEach(item => {
      emailList.push(item.email);
    });
    Globals.downloadFile(emailList, 'email list.txt');
  }

  chartHovered($event: any) {

  }

  chartClicked($event: any) {

  }

  openRemoveUserConfirmationDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: 'Are you sure you want to drop this user?'});
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.authService.drop_user(id).subscribe(result => {
          console.log(result);
          if (result['result'] === true) {
            this.snackbar.open('User removed', 'Ok', {
              duration: 2000
            });
          } else {
            this.snackbar.open('Unable to remove user', 'Dismiss', {
              duration: 3000
            });
          }
        });
        this.snackbar.open('Removing', 'Ok', {
          duration: 2000
        });
      }
    });
  }

  openEditUserDialog(row: UserFull) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {data: row});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result['action'] === 'update') {
        console.log('Updating user');
        this.authService.updateUser(result['user']).subscribe(response => {
          console.log(response);
        });
      }
    });
  }
}
