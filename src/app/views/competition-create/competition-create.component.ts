import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Action, CreateCompetition, Task} from '../../models/competition';
import {CompetitionService} from '../../services/competition.service';
import {MatSnackBar} from '@angular/material';
import {privateEntriesToIndex} from '@angular/compiler-cli/src/metadata/index_writer';

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

  constructor(private _formBuilder: FormBuilder, public competitionService: CompetitionService, public snackbar: MatSnackBar) {
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
    competition.start = i.year + '-' + i.month + '-' + i.date + ' ' + i.hour + ':' + i.minute + ':00';
    const j = this.setupFG.get('end').value._i;
    competition.end = j.year + '-' + j.month + '-' + j.date + ' ' + j.hour + ':' + j.minute + ':00';
    this.tasks.forEach((task, index) => {task.id = index; });
    competition.tasks = this.tasks;
    competition.actions = this.actions;
    console.log(competition);
    this.competitionService.createNewCompetition(competition).subscribe((result) => {
      if (result === true) {
        this.snackbar.open('Competition created', 'Ok', {
          duration: 2000,
        });
      }
    });
  }
}
