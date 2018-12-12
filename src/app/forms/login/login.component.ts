import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '../../services/authenticate.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatSnackBar} from '@angular/material';
import {User} from '../../models/user';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';

export class EmailErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);
  passwordFC = new FormControl('', [
    Validators.minLength(8),
    Validators.required
  ]);
  rememberFC = new FormControl('', []);

  emailErrorMatcher = new EmailErrorMatcher();
  response: JSON;
  returnUrl: string;
  loggingIn = false;

  constructor(private auth: AuthenticateService,
              public snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  goToRegister() {
    this.router.navigate(['register'], {queryParams: {returnUrl: this.returnUrl}});
  }

  login() {
    if (this.emailFormControl.valid && this.passwordFC.valid) {
      console.log(this.rememberFC.value);
      const user: User = {
        email: this.emailFormControl.value,
        password: this.passwordFC.value,
        remember: this.rememberFC.value
      };
      this.loggingIn = true;
      this.auth.login(user, (success) => {
        if (success) {
          this.snackBar.open('Successfully logged you in', 'Ok', {duration: 2000});
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.snackBar.open('Failed to log you in, check your email and password', 'Ok', {duration: 2000});
        }
        this.loggingIn = false;
      });
    }
  }
}
