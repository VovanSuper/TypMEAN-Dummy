import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class UserRouteValidService implements CanActivate {

  constructor(private router: Router, private api: ApiService) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.api.getUserById(route.params['id']).then(usr => {
        if (!usr) {
          this.router.navigateByUrl('/notfound');
          return reject(false);
        }
        return resolve(true);
      });
    });
  }
}
