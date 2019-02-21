import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Team} from '../../models/team';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-edit-team-info-dialog',
  templateUrl: './edit-team-info-dialog.component.html',
  styleUrls: ['./edit-team-info-dialog.component.scss']
})
export class EditTeamInfoDialogComponent implements OnInit {
  year = new FormControl('', []);
  team_name = new FormControl('', []);
  status: String;
  team_number = '';
  team;

  constructor(public dialogRef: MatDialogRef<EditTeamInfoDialogComponent>, @Inject(MAT_DIALOG_DATA) public userData: Team) {
    this.team_name.setValue(userData.team_name);
    this.status = userData.status;
    this.team_number = userData.team_number;
    this.team = userData;
  }
  ngOnInit() {
  }

  updateTeamInfo() {
    const newName = this.team_name.value;
    this.team.team_name = newName;
    this.team.status = this.status;
    this.dialogRef.close(this.team);
  }
}
