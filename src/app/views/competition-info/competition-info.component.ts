import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Competition, Task, Action} from '../../models/competition';
import {CompetitionService} from '../../services/competition.service';

@Component({
  selector: 'app-competition-info',
  templateUrl: './competition-info.component.html',
  styleUrls: ['./competition-info.component.scss']
})
export class CompetitionInfoComponent implements OnInit {
  id: number;
  competition: Competition;
  tasks: Task[];
  actions: Action[];
  constructor(public route: ActivatedRoute, public competitionService: CompetitionService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getCompetitionInfo();
    this.getTasks();
    this.getActions();
  }

  getCompetitionInfo() {
    this.competitionService.getCompetitionInfo(this.id).subscribe((result) => {
      if (result != null) {
        this.competition = result;
      }
    });
  }
  getTasks() {
    this.competitionService.getTasks(this.id).subscribe((result) => {
      if (result != null) {
        this.tasks = result;
      }
    });
  }
  getActions() {
    this.competitionService.getActions(this.id).subscribe((result) => {
      if (result != null) {
        this.actions = result;
      }
    });
  }

  updateRegistration() {
    if (this.competition.registration_status === 'closed') {
      this.competitionService.openRegistration(this.competition.id).subscribe((result) => {
        console.log(result);
        if (result === true) {
          if (this.competition.registration_status === 'open') {
            this.competition.registration_status = 'closed';
          } else {
            this.competition.registration_status = 'open';
          }
        }
      });
    } else {
      this.competitionService.closeRegistration(this.competition.id).subscribe((result) => {
        console.log(result);
        if (result === true) {
          if (this.competition.registration_status === 'open') {
            this.competition.registration_status = 'closed';
          } else {
            this.competition.registration_status = 'open';
          }
        }
      });
    }
  }
}
