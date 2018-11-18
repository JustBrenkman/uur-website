import {Component, OnInit} from '@angular/core';
import {Event, SocketService} from '../../services/socket.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  constructor(public socket: SocketService) { }

  ngOnInit() {
  }

  connectToSocket() {
    console.log('Attempting to connect');
    this.socket.initSocketConnection();
    this.socket.onEvent(Event.CONNECTED).subscribe(() => {
      console.log('Connected');
      console.log(this.socket.status);
    });
  }
}
