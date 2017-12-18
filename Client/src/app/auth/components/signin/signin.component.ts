import { Component, OnInit } from '@angular/core';
import { Validation, ValidateField } from '../../Validations/';
import { AuthService } from '../../../shared/module/services/';
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

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.username = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5), Validation.passwordStrength]);
    this.signinForm = new FormGroup({
      'username': this.username,
      'password': this.password
    });
    this.validatefield = ValidateField;
    this.reset();
  }

  signIn() {
    console.dir(this.signinForm.value);
    this.auth.login(this.signinForm.value['username'], this.signinForm.value['password']).then(isloged => {
      this.router.navigateByUrl('/events');
    })
      .catch(err => console.error(`[signin.cmp->signIn()]:: ${JSON.stringify(err)}`));
    this.reset();
  }


  private reset() {
    this.signinForm.reset();
  }

  getErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' :
      this.username.hasError('minLength') ? 'Should be no less than 4 letters' : '';
  }
}