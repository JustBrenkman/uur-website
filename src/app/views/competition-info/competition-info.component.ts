import {Component, OnDestroy, OnInit, ViewChild, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Competition, Task, Action, Scoreboard} from '../../models/competition';
import {CompetitionService} from '../../services/competition.service';
import {RolePrivilegeGuard} from '../../services/role-privilege-guard.service';
import {Team} from '../../models/team';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

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
  teams: Team[];
  scoreBoard: Scoreboard[];
  source: EventSource;
  timer: Date;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  scoreboardSrc = new MatTableDataSource(this.scoreBoard);
  usersDisplayColumn: string[] = ['rank', 'team_number', 'score'];

  timeleft = 50;
  interval;

  constructor(public route: ActivatedRoute, public competitionService: CompetitionService, public roleGuard: RolePrivilegeGuard,
              public router: Router, public zone: NgZone) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getCompetitionInfo();
    this.getTasks();
    this.getActions();
    this.getScoreBoard();
    this.scoreboardSrc.paginator = this.paginator;
    this.scoreboardSrc.sort = this.sort;
    this.connectToSource();
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

  getScoreBoard() {
    this.competitionService.getScoreBoard(this.id).subscribe((result) => {
      console.log(result);
      this.scoreBoard = result.sort((a, b) => (a.score > b.score) ? -1 : (a.score < b.score) ? 1 : 0);
      this.scoreboardSrc.data = this.scoreBoard;
      this.scoreboardSrc.sort = this.sort;
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

  openRegistration() {
    this.router.navigate(['dashboard/competition/register', {id: this.competition.id}]);
  }

  startTimer() {
    this.competitionService.startTimer(500).subscribe(() => {
    });
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  connectToSource() {
    this.competitionService.getEventStream().subscribe((data) => {
      if (data['command'] === 'start') {
        console.log(data);
        this.timeleft = data['timer'];
        this.zone.run(() => {
          this.start();
        });
      }
    });
  }

  start() {
    this.interval = setInterval(() => {
      if (this.timeleft > 0) {
        this.timeleft--;
        console.log(this.timeleft);
      } else {
        this.timeleft = 0;
      }
    }, 1000);
  }
}

