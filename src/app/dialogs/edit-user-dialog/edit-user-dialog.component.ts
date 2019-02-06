import {Component, Inject, OnInit} from '@angular/core';
import {School} from '../../models/school';
import {Data, EmailErrorMatcher} from '../../forms/sign-up/sign-up.component';
import {FormControl, Validators} from '@angular/forms';
import {SchoolsService} from '../../services/schools.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {AuthenticateService} from '../../services/authenticate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User, UserAdd, UserFull} from '../../models/user';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {

  schools: School[];
  data: Data;
  response: JSON;
  userInfo: UserFull;
  roles: string[] = ['Director', 'Teacher', 'Student', 'Judge'];
  privileges: string[] = ['admin', 'member', 'viewer'];
  id: string;

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
  schoolFC = new FormControl('', [
    Validators.required
  ]);
  roleFC = new FormControl('', [
    Validators.required
  ]);
  privFC = new FormControl('', [
    Validators.required
  ]);
  statusFC = new FormControl('', [
    Validators.required
  ]);
  passwordFC = new FormControl('', [
    Validators.minLength(8),
    Validators.required
  ]);
  passworConfirmdFC = new FormControl('', [
    Validators.minLength(8),
    Validators.required,
    // matchingPasswords(this.passwordFC.value, this.passworConfirmdFC.value)
  ]);

  constructor(
    private schoolService: SchoolsService,
    public snackBar: MatSnackBar,
    private authService: AuthenticateService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: UserFull) {
    this.emailFormControl.setValue(userData.email);
    this.firtNameFC.setValue(userData.first_name);
    this.lastNameFC.setValue(userData.last_name);
    this.schoolFC.setValue(userData.school);
    this.roleFC.setValue(userData.role);
    this.privFC.setValue(userData.privileges);
    this.id = userData.id;
    this.statusFC.setValue(userData.status);
  }

  emailErrorMatcher = new EmailErrorMatcher();
  returnUrl: string;

  ngOnInit() {
    this.getSchools();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
    if (this.emailFormControl.valid && this.firtNameFC.valid && this.lastNameFC.valid && this.schoolFC.valid &&
      this.privFC.valid && this.roleFC.valid) {
      this.register({email: this.emailFormControl.value, firstName: this.firtNameFC.value,
        lastName: this.lastNameFC.value, school: this.schoolFC.value, role: this.roleFC.value, privileges: this.privFC.value,
        auth_token: localStorage.getItem('auth_token')});
    }
  }

  changePassword() {
    if (this.passwordFC.value === this.passworConfirmdFC.value && this.passwordFC.valid && this.passworConfirmdFC.valid) {
        console.log('Changing password');
        this.authService.changePassword(this.id, this.passwordFC.value).subscribe(response => {
          if (response['result'] === 'success') {
            this.snackBar.open('Successfully changed password', 'Ok', {
              duration: 2000
            });
          }
        });
    } else {
      this.passworConfirmdFC.setErrors({'mismatch': true});
    }
    this.dialogRef.close({'action': 'password'});
  }

  isFormValid(): boolean {
    return (this.emailFormControl.valid && this.firtNameFC.valid && this.lastNameFC.valid && this.schoolFC.valid &&
    this.roleFC.valid && this.privFC.valid);
  }

  update() {
    if (this.isFormValid()) {
      const user: UserFull = {email: this.emailFormControl.value, first_name: this.firtNameFC.value, last_name: this.lastNameFC.value,
        school: this.schoolFC.value, role: this.roleFC.value, privileges: this.privFC.value, timestamp: null,
        id: this.id, status: this.statusFC.value, last_log_in: null};
      this.dialogRef.close({'action': 'update', 'user': user});
    }
  }
}
