import { Component, OnInit } from '@angular/core';
import { Validation, ValidateField } from '../../Validations/';
import { AuthService, SnackBarService } from '../../../shared/module/services/';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: 'signin.component.html',
  styleUrls: ['signin.component.scss']
})

export class SigninComponent implements OnInit {
  validatefield;
  signinForm: FormGroup;
  username: FormControl;
  password: FormControl;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackSvc: SnackBarService
  ) { }

  ngOnInit() {
    this.username = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5), Validation.passwordStrength]);
    this.signinForm = this.fb.group({
      'username': this.username,
      'password': this.password
    });
    this.validatefield = ValidateField;
    this.reset();
  }

  signIn() {
    console.dir(this.signinForm.value);
    this.authSvc.loginLocal(this.signinForm.value['username'], this.signinForm.value['password']).then(isloged => {
      this.router.navigateByUrl('/events');
    })
      .catch(err => {
        this.snackSvc.show('Error loging Fb', err.toString());
        console.error(`[signin.cmp->signIn()]:: ${JSON.stringify(err)}`)
      });
    this.reset();
  }

  loginFb() {
    this.authSvc.loginFb().then(user => {
      console.log('[home.cmp->loginFb()]:: authenticated');
    })
      .catch(err => {
        this.snackSvc.show('Error loging Fb', err.toString());
        console.error(`[signin.cmp->loginFb()]:: ${JSON.stringify(err)}`)
      });
  }


  private reset() {
    this.signinForm.reset();
  }

  getErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' :
      this.username.hasError('minLength') ? 'Should be no less than 4 letters' : '';
  }
}