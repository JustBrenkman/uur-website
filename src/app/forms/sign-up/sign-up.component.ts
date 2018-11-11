import {Component, OnInit, Optional} from '@angular/core';
import {FormControl, Validators, NgForm, FormGroupDirective, FormGroup} from '@angular/forms';

import {SchoolsService} from './schools.service';
import {School} from './school';
import {ErrorStateMatcher} from '@angular/material';

export interface Data {
  abr: string;
  name: string;
}

export class EmailErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  schools: School[];
  data: Data;
  response: JSON;

  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);
  firtNameFC = new FormControl('', [
    Validators.required
  ]);
  lastNameFC = new FormControl('', [
    Validators.required
  ]);
  passwordFC = new FormControl('', [
    Validators.minLength(8),
    Validators.required
  ]);
  schoolFC = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private schoolService: SchoolsService) { }

  emailErrorMatcher = new EmailErrorMatcher();

  ngOnInit() {
    this.getSchools();
  }

  getSchools(): void {
    this.schoolService.getSchools().subscribe((data: School[]) => {this.schools = Array.from(data);
      console.log(this.schools);
    });
  }

  register(data) {
    this.schoolService.register(data).subscribe((rep: JSON) => {
      this.response = rep;
      console.log(this.response['result']);
    });
  }

  onSubmit() {
    if (this.emailFormControl.valid) {
      console.log('Email: ' + this.emailFormControl.value);
    } else {
      console.log('Email: Invalid');
    }

    if (this.passwordFC.valid) {
      console.log('Password: ' + this.passwordFC.value);
    } else {
      console.log('Password: Invalid');
    }

    if (this.firtNameFC.valid) {
      console.log('First Name: ' + this.firtNameFC.value);
    } else {
      console.log('First Name: Invalid');
    }

    if (this.lastNameFC.valid) {
      console.log('Last Name: ' + this.lastNameFC.value);
    } else {
      console.log('Last Name: Invalid');
    }

    if (this.schoolFC.valid) {
      console.log('School: ' + this.schoolFC.value);
    } else {
      console.log('School: Invalid');
    }

    if (this.emailFormControl.valid && this.passwordFC.valid && this.firtNameFC.valid && this.lastNameFC.valid && this.schoolFC.valid) {
      this.register({email: this.emailFormControl.value, password: this.passwordFC.value, firstName: this.firtNameFC.value,
        lastName: this.lastNameFC.value, school: this.schoolFC.value});
    }
  }
}
