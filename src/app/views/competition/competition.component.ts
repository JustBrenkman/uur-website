import {AfterViewInit, Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Event, SocketService} from '../../services/socket.service';
import {formatDate} from '@angular/common';
import {RolePrivilegeGuard} from '../../services/role-privilege-guard.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Globals} from '../../models/globals';
import {CompetitionService} from '../../services/competition.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit, AfterViewInit {

  @ViewChild('counter')
  public counter: ElementRef;

  usersDisplayColumn: string[] = ['timestamp', 'id', 'name', 'start', 'end', 'registration_status', 'status', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  competitionsDataSource = new MatTableDataSource(this.globals.competitions);

  constructor(public socket: SocketService, private zone: NgZone, private renderer: Renderer2, public privilegeGuard: RolePrivilegeGuard,
              public globals: Globals, public competitionService: CompetitionService) {

  }

  ngOnInit() {
    this.competitionsDataSource.paginator = this.paginator;
    this.competitionsDataSource.sort = this.sort;
    if (!this.globals.teamsAdmin) {
      this.getCompetitionListFull();
    } else {
      this.competitionsDataSource.data = this.globals.competitions;
      this.competitionsDataSource.paginator = this.paginator;
    }
  }

  privilegeCheck(privilege: string): boolean {
    return this.privilegeGuard.privilegeGuard(privilege);
  }

  getCompetitionListFull() {
    this.competitionService.getFullList().subscribe((result) => {
      console.log(result);
      if (result['result'] === 'success') {
       this.globals.competitions = result['competitions'];
       this.competitionsDataSource.data = this.globals.competitions;
      }
    });
  }

  connectToSocket() {
    console.log('Attempting to connect');
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.renderer.setProperty(this.counter.nativeElement, 'textContent', formatDate(Date.now(), 'mm:ss.SS', 'en'));
      });
    });
  }

  disconnect() {
    // this.socket.disconnect();
  }

  ngAfterViewInit(): void {
    this.competitionsDataSource.paginator = this.paginator;
  }

  viewCompetitionProfile(id: number) {
    console.log(id);
  }
}
