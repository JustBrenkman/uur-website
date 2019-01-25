import {Component, Inject, OnInit} from '@angular/core';
import {School} from '../../models/school';
import {FormControl, Validators} from '@angular/forms';
import {SchoolsService} from '../../services/schools.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {AuthenticateService} from '../../services/authenticate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Data, EmailErrorMatcher} from '../sign-up/sign-up.component';
import {UserAdd} from '../../models/user';

export interface Data {
  abr: string;
  name: string;
}

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {

  schools: School[];
  data: Data;
  response: JSON;
  roles: string[] = ['Director', 'Teacher', 'Student'];
  privileges: string[] = ['admin', 'member', 'viewer', 'judge'];

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
  roleFC = new FormControl('', [
    Validators.required
  ]);
  privFC = new FormControl('', [
    Validators.required
  ]);


  constructor(
    private schoolService: SchoolsService,
    public snackBar: MatSnackBar,
    private authService: AuthenticateService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<AddUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: UserAdd) { }

  emailErrorMatcher = new EmailErrorMatcher();
  returnUrl: string;

  ngOnInit() {
    this.getSchools();
    this.roleFC.setValue('Teacher');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.passwordFC.setValue('');
    this.emailFormControl.setValue('');
  }

  getSchools(): void {
    this.schoolService.getSchools().subscribe((data: School[]) => {this.schools = Array.from(data);
      console.log(this.schools);
    });
  }

  register(data) {
    this.authService.addUser(data).subscribe((rep: JSON) => {
      this.response = rep;
      console.log(this.response['result']);
      if (this.response['result'] === 'success' || this.response['result'] === 'Success') {
        this.snackBar.open('Successfully register', 'Dismiss', {duration: 2000});
        // this.router.navigateByUrl(this.returnUrl);
        this.dialogRef.close();
      } else {
        this.snackBar.open('Unable to create user, user already exits', 'Ok');
        console.log('Auth token: ' + this.response['auth_token']);
      }
    });
  }

  onSubmit() {
    if (this.emailFormControl.valid && this.passwordFC.valid && this.firtNameFC.valid && this.lastNameFC.valid && this.schoolFC.valid &&
      this.privFC.valid && this.roleFC.valid) {
      this.register({email: this.emailFormControl.value, password: this.passwordFC.value, firstName: this.firtNameFC.value,
        lastName: this.lastNameFC.value, school: this.schoolFC.value, role: this.roleFC.value, privileges: this.privFC.value,
        auth_token: localStorage.getItem('auth_token')});
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
