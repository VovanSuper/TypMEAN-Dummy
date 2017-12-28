import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';

import { IUser } from '../../../shared/interfaces/';
import { ApiService, AuthService, SnackBarService } from '../../../shared/module/services/';

@Component({
  templateUrl: 'event-create.component.html',
  styleUrls: ['event-create.component.scss']
})

export class EventCreateComponent implements OnInit {
  eventForm: FormGroup;
  name: FormControl;
  place: FormControl;
  startTime: FormControl;
  endTime: FormControl;
  description: FormControl;
  // participants: FormArray;
  createdBy: FormControl;

  constructor(
    private api: ApiService,
    private router: Router,
    private authSvc: AuthService,
    private fb: FormBuilder,
    private snackSvc: SnackBarService
  ) { }

  ngOnInit() {
    let now = new Date().toLocaleDateString();
    let currentUserId = this.authSvc.currentUser.id;
    if (!currentUserId)
      this.router.navigateByUrl('/authenticate');

    this.name = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.place = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.startTime = new FormControl(now, [Validators.required]);
    this.endTime = new FormControl(now, [Validators.required]);
    this.description = new FormControl('');
    this.createdBy = new FormControl(currentUserId)

    // this.participants = new FormArray([ ]);

    this.eventForm = this.fb.group({
      'name': this.name,
      'place': this.place,
      'startTime': this.startTime,
      'endTime': this.endTime,
      'description': this.description,
      // 'participants': this.participants,
      'createdBy': this.createdBy
    });
  }

  create() {
    console.log(JSON.stringify(this.eventForm.value));
    this.api.createEvent(this.eventForm.value).then(created => {
      console.log(`[event-create.cmp->create()]:: Event created : ${JSON.stringify(created)}`);
      this.router.navigateByUrl('/events');
    })
      .catch(err => {
        this.snackSvc.show('Failed to create new Event', JSON.stringify(err));
        console.log(`[event-create.cmp->create()]:: Error creating new Event : ${JSON.stringify(err)}`);
      })
  }

  reset() {
    this.eventForm.reset();
  }
}