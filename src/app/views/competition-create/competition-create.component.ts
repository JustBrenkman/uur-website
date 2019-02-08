import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../models/competition';

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
  actions = [];

  constructor(private _formBuilder: FormBuilder) {
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
}
