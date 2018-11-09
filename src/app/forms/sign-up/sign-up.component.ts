import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {InMemoryDataService} from './in-memory-data.service';
import {SchoolsService} from './schools.service';
import {School} from './school';

export interface Data {
  abr: string;
  name: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  optionsSelect: Array<any>;
  schoolControl = new FormControl('', [Validators.required]);
  schools: School[];
  data: Data;
  school: School;
  // schools: School[] = [
  //   { value: 'BYU', label: 'Brigham Young University' },
  //   { value: 'LI', label: 'Lehi' },
  //   { value: 'NB', label: 'Nebo' },
  // ];

  constructor(private schoolScervice: SchoolsService) { }

  ngOnInit() {
    this.getSchools();
  }

  getSchools(): void {
    this.schoolScervice.getSchools().subscribe((data: School[]) => {this.schools = Array.from(data);
      // this.schools = Array.from(this.schools);
      console.log(this.schools);
    });
    this.schoolScervice.getTest();
    console.log('Got im');
  }

}
