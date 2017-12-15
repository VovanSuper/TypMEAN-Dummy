import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
// import { IToastr } from './toastr.interface';
// import { TOASTR_TOKEN } from './tokens.libs';


@Injectable()
export class ErrorService {
  constructor(private router: Router /*, @Inject(TOASTR_TOKEN) private toastr: IToastr */) { }

  error(errMsg: string, errTitle?: string, navigateUrl = '/') {
    console.log(`ErrorService:: ${errMsg}`);
    // this.toastr.error(errMsg, errTitle);
    this.router.navigateByUrl(navigateUrl);
  }
}