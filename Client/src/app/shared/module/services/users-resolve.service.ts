import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from './api.service';
import { IUser } from '../../interfaces/';

@Injectable()
export class UsersResolverService implements Resolve<Promise<IUser[]> | IUser[]> {

  constructor(private api: ApiService) { }

  resolve() {
    return new Promise<IUser[]>((resolve, reject) => {
      this.api.getUsers()
        .then(users => resolve(users as IUser[]))
        .catch(err => reject(err));
    });
  }
}
