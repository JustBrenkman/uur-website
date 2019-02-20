import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Action, CreateCompetition, Task} from '../../models/competition';
import {CompetitionService} from '../../services/competition.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-competition-create',
  templateUrl: './competition-create.component.html',
  styleUrls: ['./competition-create.component.scss']
})
export class CompetitionCreateComponent implements OnInit {
  setupFG: FormGroup;
  tasksFG: FormGroup;
  actionsFG: FormGroup;
  tasks: Array<Task> = [];
  actions: Array<Action> = [];

  constructor(private _formBuilder: FormBuilder, public competitionService: CompetitionService, public snackbar: MatSnackBar,
              public router: Router) {
  }

  ngOnInit() {
    this.setupFG = this._formBuilder.group({
      name: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      test: ['', Validators.required],
    });
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
  addNewTask() {
    this.tasks.push(new Task());
  }
  removeAction(index: number) {
    this.actions.splice(index, 1);
  }
  addNewAction() {
    this.actions.push(new Action());
  }

  createCompetition() {
    const competition = new CreateCompetition();
    competition.name = this.setupFG.get('name').value;
    const i = this.setupFG.get('start').value._i;
    console.log(i);
    competition.start = i.year + '-' + (i.month + 1) + '-' + i.date + ' ' + i.hour + ':' + i.minute + ':00';
    const j = this.setupFG.get('end').value._i;
    competition.end = j.year + '-' + (j.month + 1) + '-' + j.date + ' ' + j.hour + ':' + j.minute + ':00';
    this.tasks.forEach((task, index) => {task.id = index; });
    competition.tasks = this.tasks;
    competition.actions = this.actions;
    console.log(competition);
    this.competitionService.createNewCompetition(competition).subscribe((result) => {
      if (result === true) {
        this.snackbar.open('Competition created', 'Ok', {
          duration: 2000,
        });
        this.router.navigateByUrl('/dashboard/competition');
      } else {
        this.snackbar.open('Failed to create competition', 'Ok', {
          duration: 2000
        });
      }
    });
  }
}
