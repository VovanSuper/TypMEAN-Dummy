import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';

import { IUser } from '../../../shared/interfaces/';
import { ApiService } from '../../../shared/module/services/';

@Component({
  templateUrl: 'event-create.component.html',
  styleUrls: ['event-create.component.scss']
})

export class EventCreateComponent implements OnInit {
  eventForm: FormGroup;
  name: FormControl;
  startTime: FormControl;
  endTime: FormControl;
  description: FormControl;
  participants: FormArray;

  constructor(private api: ApiService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    let now = new Date().toLocaleDateString();
    this.name = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.startTime = new FormControl(now, [Validators.required]);
    this.endTime = new FormControl(now, [Validators.required]);
    this.description = new FormControl('');
    this.participants = new FormArray([
    ]);

    this.eventForm = this.fb.group({
      'name': this.name,
      'startTime': this.startTime,
      'endTime': this.endTime,
      'description': this.description,
      'participants': this.participants
    });
  }

  create() {
    console.log(JSON.stringify(this.eventForm.value));
    this.api.createEvent(this.eventForm.value).then(resp => {
      this.router.navigateByUrl('/events');
    })
  }

  reset() {
    this.eventForm.reset();
  }
}