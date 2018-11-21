import {Component, ElementRef, NgZone, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Event, SocketService} from '../../services/socket.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  @ViewChild('counter')
  public counter: ElementRef;
  now;
  messages: string[] = [];

  constructor(public socket: SocketService, private zone: NgZone, private renderer: Renderer2) {

  }

  ngOnInit() {

  }

  connectToSocket() {
    console.log('Attempting to connect');
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.renderer.setProperty(this.counter.nativeElement, 'textContent', formatDate(Date.now(), 'mm:ss.SS', 'en'));
      });
    });
    // this.socket.initSocketConnection();
    // this.socket.onEvent(Event.CONNECTED).subscribe(() => {
    //   console.log('Connected');
    //   console.log(this.socket.status);
    // });
    // this.socket.onMessageRecieved().subscribe((message: string) => {
    //   console.log('Received message: ' + message);
    //   this.messages.push(message);
    // });
  }

  disconnect() {
    // this.socket.disconnect();
  }
}
