import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Action, Task} from '../../models/competition';
import {CompetitionService} from '../../services/competition.service';

@Component({
  selector: 'app-judge-team-view',
  templateUrl: './judge-team-view.component.html',
  styleUrls: ['./judge-team-view.component.scss']
})
export class JudgeTeamViewComponent implements OnInit {

  team_number: String;
  comp_id: number;

  tasks: Task[];
  actions: Action[];
  values = {};
  taskValues = {};

  constructor(public route: ActivatedRoute, public compService: CompetitionService) {
    this.team_number = this.route.snapshot.queryParamMap.get('team_number');
    this.comp_id = Number(this.route.snapshot.queryParamMap.get('comp_id'));
  }

  ngOnInit() {
    this.compService.getTasks(this.comp_id).subscribe((result) => {
      if (result) {
        this.tasks = result;
        this.tasks.forEach((task, index) => { this.taskValues[index] = 0; });
      }
    });
    this.compService.getActions(this.comp_id).subscribe((result) => {
      if (result) {
        this.actions = result;
        this.actions.forEach((action, index) => { this.values[index] = 0; });
      }
    });
  }

  increaseAction(index: number) {
    if (this.increaseTaskValue(this.actions[index].task_id, this.actions[index].increment_value)) {
      this.values[index] = this.values[index] + this.actions[index].increment_value;
    }
  }

  decreaseAction(index: number) {
      this.values[index] = this.values[index] - this.actions[index].increment_value;
      this.decreaseTask(this.actions[index].task_id, this.actions[index].increment_value);
  }

  increaseTaskValue(task_id, increment_value): boolean {
    let found = false;
    this.tasks.forEach((task, index) => {
      if (task.id === task_id) {
        if (!((this.taskValues[task_id] + increment_value) > task.max_value)) {
          found = true;
          this.taskValues[task_id] = this.taskValues[task_id] + increment_value;
        }
      }
    });
    return found;
  }

  decreaseTask(task_id, increment) {
    this.tasks.forEach((task, index) => {
      if (task.id === task_id) {
        this.taskValues[task_id] = this.taskValues[task_id] - increment;
      }
    });
  }
  // isTooMuch(task_id, increment_value): boolean {
  //   return false;
  // }
}
