import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Team} from '../../models/team';
import {CompetitionService} from '../../services/competition.service';

@Component({
  selector: 'app-register-team-competition',
  templateUrl: './register-team-competition.component.html',
  styleUrls: ['./register-team-competition.component.scss']
})
export class RegisterTeamCompetitionComponent implements OnInit {

  id: number;
  registeredTeams: Team[];
  unregisteredTeams: Team[];
  constructor(public route: ActivatedRoute, public compService: CompetitionService, public router: Router, public location: Location) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getRegisteredTeams();
    this.getUnregisteredTeams();
  }

  getUnregisteredTeams() {
    console.log('Getting teams');
    this.compService.getUnregisteredTeams(this.id).subscribe((result) => {
      this.unregisteredTeams = result;
      console.log(result);
    });
  }

  getRegisteredTeams() {
    console.log('Getting registered teams');
    this.compService.getRegisterdTeams(this.id).subscribe((result) => {
      this.registeredTeams = result;
      console.log(result);
    });
  }

  registerTeam(team_number: string) {
    console.log('Registering team: ' + team_number);
    this.compService.registerTeam(this.id, team_number).subscribe((result) => {
      if (result) {
        const team: Team = this.unregisteredTeams.filter((t: Team) => t.team_number === team_number)[0];
        this.unregisteredTeams = this.unregisteredTeams.filter((t: Team) => t.team_number !== team_number);
        this.registeredTeams.push(team);
      }
    });
  }

  back() {
    this.location.back();
  }

  cancel(team_number: string) {
    this.compService.cancelRegistration(this.id, team_number).subscribe((result) => {
      if (result) {
        const team: Team = this.registeredTeams.filter((t: Team) => t.team_number === team_number)[0];
        this.registeredTeams = this.registeredTeams.filter((t: Team) => t.team_number !== team_number);
        this.unregisteredTeams.push(team);
      }
    });
  }
}
