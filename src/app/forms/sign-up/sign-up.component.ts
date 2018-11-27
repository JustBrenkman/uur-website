import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormControl, Validators, NgForm, FormGroupDirective, FormGroup} from '@angular/forms';

import {SchoolsService} from '../../services/schools.service';
import {School} from '../../models/school';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef, MatIconRegistry} from '@angular/material';

import {MatSnackBar} from '@angular/material';
import {AuthenticateService} from '../../services/authenticate.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserAdd} from '../../models/user';
import {DomSanitizer} from '@angular/platform-browser';

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
  roles: string[] = ['Teacher', 'Student'];

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


  constructor(
    private schoolService: SchoolsService,
    public snackBar: MatSnackBar,
    private authService: AuthenticateService,
    private route: ActivatedRoute,
    private router: Router,
    public iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github_fade.svg'));
    iconRegistry.addSvgIcon('instagram', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/instagram_flat.svg'));
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook_flat.svg'));
    iconRegistry.addSvgIcon('linkedin', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin_flat.svg'));
    iconRegistry.addSvgIcon('slack', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/slack_fade.svg'));
    iconRegistry.addSvgIcon('youtube', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/youtube_flat.svg'));
  }

  emailErrorMatcher = new EmailErrorMatcher();
  returnUrl: string;

  ngOnInit() {
    this.getSchools();
    this.roleFC.setValue('Teacher');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getSchools(): void {
    this.schoolService.getSchools().subscribe((data: School[]) => {this.schools = Array.from(data);
      console.log(this.schools);
    });
  }

  register(data) {
    this.authService.register(data).subscribe((rep: JSON) => {
      this.response = rep;
      console.log(this.response['result']);
      if (this.response['result'] === 'success' || this.response['result'] === 'Success') {
        this.snackBar.open('Successfully register', 'Dismiss', {duration: 2000});
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.snackBar.open('Unable to create user, user already exits', 'Ok');
        console.log('Auth token: ' + this.response['auth_token']);
      }
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

    console.log('Role: ' + this.roleFC.value);

    if (this.emailFormControl.valid && this.passwordFC.valid && this.firtNameFC.valid && this.lastNameFC.valid && this.schoolFC.valid) {
      this.register({email: this.emailFormControl.value, password: this.passwordFC.value, firstName: this.firtNameFC.value,
        lastName: this.lastNameFC.value, school: this.schoolFC.value, role: this.roleFC.value});
    }
  }
}
