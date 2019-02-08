import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Action, CreateCompetition, Task} from '../../models/competition';
import {CompetitionService} from '../../services/competition.service';
import {MatSnackBar} from '@angular/material';

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
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
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
    competition.start_date = this.setupFG.get('start_date').value;
    competition.end_date = this.setupFG.get('end_date').value;
    competition.start_time = this.setupFG.get('start_time').value;
    competition.end_time = this.setupFG.get('end_time').value;
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
