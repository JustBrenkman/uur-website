import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Action, Score, Task, TaskScores} from '../../models/competition';
import {CompetitionService} from '../../services/competition.service';
import {MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';

@Component({
  selector: 'app-judge-team-view',
  templateUrl: './judge-team-view.component.html',
  styleUrls: ['./judge-team-view.component.scss']
})
export class JudgeTeamViewComponent implements OnInit {

  team_number: string;
  comp_id: number;

  tasks: Task[];
  actions: Action[];
  values = {};
  taskValues = {};
  actionTimesCompleted = {};

  timeLeft = 300;
  timer = 300;
  interval;
  lastCommand = null;

  constructor(public route: ActivatedRoute, public compService: CompetitionService, public snackBar: MatSnackBar, public location: Location, public zone: NgZone) {
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
        this.actions.forEach((action, index) => { this.actionTimesCompleted[index] = 0; });
      }
    });
    this.connectToSource();
  }

  increaseAction(index: number) {
    if (this.increaseTaskValue(this.actions[index].task_id, this.actions[index].increment_value)) {
      this.values[index] = this.values[index] + this.actions[index].increment_value;
    }
    this.actionTimesCompleted[index] = this.actionTimesCompleted[index] < this.actions[index].limit ? this.actionTimesCompleted[index] + 1 : this.actionTimesCompleted[index];
  }

  decreaseAction(index: number) {
      this.values[index] = this.values[index] - this.actions[index].increment_value;
      this.decreaseTask(this.actions[index].task_id, this.actions[index].increment_value);

    this.actionTimesCompleted[index] = this.actionTimesCompleted[index] > 0 ? this.actionTimesCompleted[index] - 1 : this.actionTimesCompleted[index];
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

  calculateTotalForTask(task_id: number) {
    let total = 0;
    this.actions.forEach((action, index) => {
      if (action.task_id === task_id) {
        total += this.actionTimesCompleted[index] * action.increment_value;
      }
    });
    return total;
  }

  calculateTotal() {
    let total = 0;
    this.tasks.forEach((task) => {
      total += this.calculateTotalForTask(task.id);
    });
    return total;
  }

  addScoreToTeam() {
    const scores = new TaskScores();
    this.tasks.forEach((task, index) => {
      scores.addScore(new Score(task.id, this.calculateTotalForTask(task.id)));
    });
    this.compService.addScoreToTeam(this.team_number, this.comp_id, scores).subscribe((result) => {
      if (result) {
        this.snackBar.open('Finished round on team', 'Ok', {
          duration: 2000
        });
        this.location.back();
      }
    });
  }

  connectToSource() {
    this.compService.getEventStream().subscribe((data) => {
      if (this.lastCommand != null) {
        if (this.lastCommand['command'] !== data['command']) {
          if (data['command'] === 'start') {
            console.log(data);
            this.timeLeft = data['timer'];
            this.zone.run(() => {
              this.start();
            });
          } else if (data['command'] === 'stop') {
            this.pauseTimer();
          }
        }
      }
      this.lastCommand = data;
    });
  }

  start() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        console.log(this.timeLeft);
      } else {
        this.timeLeft = 0;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
