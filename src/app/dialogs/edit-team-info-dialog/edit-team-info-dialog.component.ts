import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserFull} from '../../models/user';
import {Team} from '../../models/team';

@Component({
  selector: 'app-edit-team-info-dialog',
  templateUrl: './edit-team-info-dialog.component.html',
  styleUrls: ['./edit-team-info-dialog.component.scss']
})
export class EditTeamInfoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditTeamInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public userData: Team) { }

  ngOnInit() {
  }

}
