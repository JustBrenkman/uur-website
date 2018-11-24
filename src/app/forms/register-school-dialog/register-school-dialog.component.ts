import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SchoolsService} from '../../services/schools.service';
import {SchoolFull} from '../../models/school';
import {EmailErrorMatcher} from '../sign-up/sign-up.component';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register-school-dialog',
  templateUrl: './register-school-dialog.component.html',
  styleUrls: ['./register-school-dialog.component.scss']
})
export class RegisterSchoolDialogComponent implements OnInit {

  STATES: any[] = [{state: 'Alabama - AL', abr: 'AL'},
    {state: 'Alaska - AK', abr: 'AK'},
    {state: 'Arizona - AZ', abr: 'AZ'},
    {state: 'Arkansas - AR', abr: 'AR'},
    {state: 'California - CA', abr: 'CA'},
    {state: 'Colorado - CO', abr: 'CO'},
    {state: 'Connecticut - CT', abr: 'CT'},
    {state: 'Delaware - DE', abr: 'DE'},
    {state: 'Florida - FL', abr: 'FL'},
    {state: 'Georgia - GA', abr: 'GA'},
    {state: 'Hawaii - HI', abr: 'HI'},
    {state: 'Idaho - ID', abr: 'ID'},
    {state: 'Illinois - IL', abr: 'IL'},
    {state: 'Indiana - IN', abr: 'IN'},
    {state: 'Iowa - IA', abr: 'IA'},
    {state: 'Kansas - KS', abr: 'KS'},
    {state: 'Kentucky - KY', abr: 'KY'},
    {state: 'Louisiana - LA', abr: 'LA'},
    {state: 'Maine - ME', abr: 'ME'},
    {state: 'Maryland - MD', abr: 'MD'},
    {state: 'Massachusetts - MA', abr: 'MA'},
    {state: 'Michigan - MI', abr: 'MI'},
    {state: 'Minnesota - MN', abr: 'MN'},
    {state: 'Mississippi - MS', abr: 'MS'},
    {state: 'Missouri - MO', abr: 'MO'},
    {state: 'Montana - MT', abr: 'MT'},
    {state: 'Nebraska - NE', abr: 'NE'},
    {state: 'Nevada - NV', abr: 'NV'},
    {state: 'New Hampshire - NH', abr: 'NH'},
    {state: 'New Jersey - NJ', abr: 'NJ'},
    {state: 'New Mexico - NM', abr: 'NM'},
    {state: 'New York - NY', abr: 'NY'},
    {state: 'North Carolina - NC', abr: 'NC'},
    {state: 'North Dakota - ND', abr: 'ND'},
    {state: 'Ohio - OH', abr: 'OH'},
    {state: 'Oklahoma - OK', abr: 'OK'},
    {state: 'Oregon - OR', abr: 'OR'},
    {state: 'Pennsylvania - PA', abr: 'PA'},
    {state: 'Rhode Island - RI', abr: 'RI'},
    {state: 'South Carolina - SC', abr: 'SC'},
    {state: 'South Dakota - SD', abr: 'SD'},
    {state: 'Tennessee - TN', abr: 'TN'},
    {state: 'Texas - TX', abr: 'TX'},
    {state: 'Utah - UT', abr: 'UT'},
    {state: 'Vermont - VT', abr: 'VT'},
    {state: 'Virginia - VA', abr: 'VA'},
    {state: 'Washington - WA', abr: 'WA'},
    {state: 'West Virginia - WV', abr: 'WV'},
    {state: 'Wisconsin - WI', abr: 'WI'},
    {state: 'Wyoming - WY', abr: 'WY'}];

  constructor(public schoolService: SchoolsService, public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RegisterSchoolDialogComponent>) { }

  errorMatcher = new EmailErrorMatcher();

  nameFC = new FormControl('', [
    Validators.required
  ]);
  addressFC = new FormControl('', [
    Validators.required
  ]);
  cityFC = new FormControl('', [
    Validators.required
  ]);
  stateFC = new FormControl('', [
    Validators.required
  ]);
  zipcodeFC = new FormControl('', [
    Validators.minLength(5),
    Validators.required
  ]);
  phoneFC = new FormControl('', [
    Validators.required
  ]);
  districtFC = new FormControl('', [
    Validators.required
  ]);
  abr = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);

  ngOnInit() {
    this.stateFC.setValue('UT');
  }

  registerSchool() {
    if (this.nameFC.valid && this.addressFC.valid && this.cityFC.valid && this.stateFC.valid &&
      this.zipcodeFC.valid && this.phoneFC.valid && this.districtFC.valid && this.abr.valid) {

      const data: SchoolFull = {
        school_name: this.nameFC.value,
        address: this.addressFC.value,
        city: this.cityFC.value,
        state: this.stateFC.value,
        zipcode: this.zipcodeFC.value,
        phone: this.phoneFC.value,
        district: this.districtFC.value,
        abr: this.abr.value.toUpperCase(),
        timestamp: Date.now().toString(),
        id: '0'
      };

      this.schoolService.registerSchool(data).subscribe((result) => {
        console.log(result);
        if (result['result'] === 'success') {
          this.snackBar.open('Registered new school', 'Ok', {
            duration: 2000
          });
          this.dialogRef.close();
        } else {
          this.snackBar.open('Failed to register school, please check the inputs', 'Dismiss', {
            duration: 2000
          });
        }
      });
    } else {
      this.snackBar.open('Please check your input data, something is wrong');
    }
  }

}
