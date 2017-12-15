import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ValidateField, Validation } from '../../Validations/';
import { ApiService, AuthService } from '../../../shared/module/services/';

@Component({
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})

export class SignupComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  file: FormData;

  name: FormControl;
  username: FormControl;
  email: FormControl;
  secondaryemail: FormControl;
  password: FormControl;
  repassword: FormControl;
  workplace: FormControl;
  gender: FormControl;
  registrationForm: FormGroup;

  validatefield;
  genders = ['male', 'female', 'undefined'];

  constructor(
    private apiSvc: ApiService,
    private authSvc: AuthService,
    private router: Router
    //  , @Inject(TOASTR_TOKEN) private toastr: IToastr
  ) {
    this.validatefield = ValidateField;
  }

  ngOnInit() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]);
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(150),
      Validation.emailValid
    ]);
    this.secondaryemail = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(150),
      Validation.emailValid
    ]);
    this.workplace = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(150)
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(250),
      Validation.passwordStrength
    ]);
    this.repassword = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(250),
      Validation.passwordStrength
    ]);
    this.gender = new FormControl(this.genders[2]);

    this.registrationForm = new FormGroup({
      'name': this.name,
      'username': this.username,
      'email': this.email,
      'workplace': this.workplace,
      'password': this.password,
      'repassword': this.repassword,
      'gender': this.gender
    });

    this.reset();
  }

  change() {
    // this is connected to the html
    this.file = new FormData();
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.file.append('file', fileToUpload);
      this.registrationForm.addControl('avatar', new FormControl(this.file));
    };
  }

  submit() {
    console.dir(this.registrationForm.value);
    console.log(JSON.stringify(this.registrationForm.value));
    this.apiSvc.createUser(JSON.stringify(this.registrationForm.value)).then(resp => {
      if (resp && resp['token']) {
        this.authSvc.saveUser(Object.assign({}, resp, { token: resp['token'] }));
        this.reset();
        this.router.navigateByUrl('/events');
      } else {
        throw new Error('No token retured by server; something gone wrong!');
      }
    })
      .catch(err => console.error(err, 'Error signing up!'))

  }

  reset() {
    this.registrationForm.reset();
  }
}