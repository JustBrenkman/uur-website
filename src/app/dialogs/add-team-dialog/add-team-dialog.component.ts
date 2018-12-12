import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../../services/team.service';

@Component({
  selector: 'app-add-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.scss']
})
export class AddTeamDialogComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  team_number: string;
  isGeneratingTeamNumber = false;

  constructor(public dialogRef: MatDialogRef<AddTeamDialogComponent>, public _formBuilder: FormBuilder,
              public teamService: TeamService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      team_name: ['', ]
    });
  }

  generate_number() {
    this.isGeneratingTeamNumber = true;
    this.teamService.generateTeamNumber().subscribe(result => {
      console.log(result);
      if (result['result'] === 'success') {
        this.team_number = result['number'];
        console.log(result['number']);
        console.log(this.team_number);
      }
      this.isGeneratingTeamNumber = false;
    });
  }

  addTeam() {
    const team_name = this.secondFormGroup.get('team_name').value;
    this.teamService.addTeam(this.team_number, team_name).subscribe(result => {
      console.log(result);
      if (result['result'] === 'success') {
        this.snackBar.open('Successfully added new team', 'Ok', {
          duration: 2000
        });
      }
    });
    this.dialogRef.close();
  }
}
