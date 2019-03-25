import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {CompetitionService} from '../../services/competition.service';
import {Team} from '../../models/team';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-judge-team',
  templateUrl: './judge-team.component.html',
  styleUrls: ['./judge-team.component.scss']
})
export class JudgeTeamComponent implements OnInit {
  public id: number;
  public teams: Team[];
  public formControl = new FormControl();
  public filterVal: String = '';
  constructor(public route: ActivatedRoute, public location: Location, public compService: CompetitionService, public router: Router) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.formControl.valueChanges.subscribe((val) => {
      this.filterVal = val;
    });
  }

  ngOnInit() {
    this.getAllRegisteredTeams();
  }

  getAllRegisteredTeams() {
    this.compService.getAllRegisteredTeams(this.id).subscribe((result) => {
      console.log(result);
      if (result != null) {
        this.teams = result;
      }
    });
  }

  back() {
    this.location.back();
  }

  getListOfTeams() {
    if (this.filterVal === '') {
      return this.teams;
    } else {
      return this.teams.filter((team) => team.team_number.toLowerCase().includes(this.filterVal.toLowerCase()));
    }
  }

  judgeTeam(team_number: string) {
    this.router.navigate(['/dashboard/competition/team/compete'], {queryParams: {comp_id: this.id, team_number: team_number}});
  }
}
