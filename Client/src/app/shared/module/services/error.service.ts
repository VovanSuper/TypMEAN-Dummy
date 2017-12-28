import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from './snackbar.service';

@Injectable()
export class ErrorService {
  constructor(private router: Router, private snackSvc: SnackBarService) { }

  error(errMsg: string, errTitle?: string, navigateUrl = '/') {
    console.log(`ErrorService:: ${errMsg}`);
    this.snackSvc.show(errTitle, errMsg);
    this.router.navigateByUrl(navigateUrl);
  }
}