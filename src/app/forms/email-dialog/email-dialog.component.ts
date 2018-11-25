import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Email, EmailServer} from '../../models/email';
import {EmailService} from '../../services/email.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {EmailErrorMatcher} from '../login/login.component';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss']
})
export class EmailDialogComponent implements OnInit {
  constructor(public emailservice: EmailService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<EmailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string[]) {
    // Sets the inputted recipients
    this.to = data;
    console.log(this.to);
    this.toFC.setValue(this.to);
  }

  textFC = new FormControl('', []);
  subjectFC = new FormControl('', []);
  to: string[];
  errorMatcher = new EmailErrorMatcher();
  toFC = new FormControl({disabled: true, value: this.to}, [
    Validators.required
  ]);

  ngOnInit() {
  }

  sendEmail() {
    const email: Email = {text: this.textFC.value.toString(), from: 'utahrov@gmail.com',
      subject: this.subjectFC.value, cc: [''], to: this.to, attachment: []};
    this.emailservice.sendEmail(email).subscribe((result) => {
      if (result['result'] === 'success') {
        this.snackBar.open('Successfully sent email', 'Ok', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Unable to deliver email :( ' + result['message'], 'Ok');
      }
    });
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
