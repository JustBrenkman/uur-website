import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TeamService} from '../../services/team.service';
import {Globals} from '../../models/globals';
import {RolePrivilegeGuard} from '../../services/role-privilege-guard.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, AfterViewInit {

  usersDisplayColumn: string[] = ['timestamp', 'team_name', 'team_number', 'school', 'status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  teamsDataSource = new MatTableDataSource(this.globals.teamsAdmin);

  public radarChartLabels: string[] = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
  public radarOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public options = {
    responsive: true,
    scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
        }
    }
  };
  public radarChartData: any = [
    {data: [100, 81, 56, 55, 80], label: 'You'},
    {data: [90, 79, 96, 87, 100], label: 'Average'},
    // {data: [0]}
  ];
  public radarChartType = 'radar';

  constructor(public teamService: TeamService, public globals: Globals, public roleGuard: RolePrivilegeGuard) {
    this.teamService.getTeamListUser().subscribe((list) => {
      console.log(list);
      this.globals.teams = list;
    });
  }

  ngOnInit() {
    this.teamsDataSource.paginator = this.paginator;
    this.teamsDataSource.sort = this.sort;
    if (!this.globals.teamsAdmin) {
      this.getTeamListFull();
    } else {
      this.teamsDataSource.data = this.globals.teamsAdmin;
      this.teamsDataSource.paginator = this.paginator;
    }
  }

  getTeamListFull() {
    this.teamService.getFullTeamList().subscribe((list) => {
      console.log(list);
      this.globals.teamsAdmin = list;
      this.teamsDataSource.data = this.globals.teamsAdmin;
      this.teamsDataSource.paginator = this.paginator;
    });
  }

  // Wrapper function
  privilegeGuard(privilege: string) {
    return this.roleGuard.privilegeGuard(privilege);
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngAfterViewInit(): void {
    this.teamsDataSource.paginator = this.paginator;
  }
}
