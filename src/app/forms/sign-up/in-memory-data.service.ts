import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {School} from './school';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const schools = [
        { abr: 'BYU', name: 'Brigham Young University' },
        { abr: 'LI', name: 'Lehi' },
        { abr: 'NB', name: 'Nebo' },
      ];
    return {schools};
  }
}
