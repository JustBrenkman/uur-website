import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TeamService} from '../../services/team.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {EditTeamInfoDialogComponent} from '../../dialogs/edit-team-info-dialog/edit-team-info-dialog.component';
import {Team} from '../../models/team';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.scss']
})
export class TeamProfileComponent implements OnInit {

  teamNumber: string;  // Radar
  teamName: string;
  team: Team;

  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: any = [
    {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
  ];
  public radarChartType = 'radar';
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public teamService: TeamService,
    public dialog: MatDialog
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.teamNumber = this.route.snapshot.paramMap.get('id');
    this.getTeamInfo(this.teamNumber);
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  getTeamInfo(teamNumber: string) {
    this.teamService.getTeamInfo(teamNumber).subscribe((result) => {
        this.team = result;
    });
  }

  openEditTeamInfoDialog() {
    const dialogRef = this.dialog.open(EditTeamInfoDialogComponent, {data: this.team});
    dialogRef.afterClosed().subscribe((team) => {
      this.teamService.updateTeamInfo(team).subscribe((result) => {
        console.log(result);
      });
    });
  }
}
