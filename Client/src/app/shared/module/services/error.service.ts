import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorService {
  constructor(private router: Router ) { }

  error(errMsg: string, errTitle?: string, navigateUrl = '/') {
    console.log(`ErrorService:: ${errMsg}`);
    // this.toastr.error(errMsg, errTitle);
    this.router.navigateByUrl(navigateUrl);
  }
}