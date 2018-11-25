import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter, map} from 'rxjs/operators';

interface Message {
  channel: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventbusService {
  private messages$: Subject<Message>;

  constructor() {
    this.messages$ = new Subject<Message>();
  }

  public publish<T>(channel: string, message: T): void {
    console.log('Publishing: ' + message);
    this.messages$.next({channel: channel, data: message});
  }

  public of<T>(channel: string): Observable<T> {
    const m = this.messages$.pipe(filter((message: Message) => message.channel === channel));
    return m.pipe(map(ma => ma.data));
  }
}
