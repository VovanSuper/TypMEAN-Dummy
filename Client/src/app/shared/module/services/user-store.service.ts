import { Injectable } from '@angular/core';
import { DataStorageService } from './data-store.service';
import { IUser } from '../../interfaces/';

@Injectable()
export class UserStoreService {

  constructor(private dataStoreSvc: DataStorageService) { }
  
  getToken(): string {
    return this.dataStoreSvc.getByKey('token') || null;
  }

  getUserInfo(): IUser {
    let name = this.dataStoreSvc.getByKey('name');
    // let id = this.dataStoreSvc.getByKey('id');
    let email = this.dataStoreSvc.getByKey('email');
    let gender = this.dataStoreSvc.getByKey('gender');
    let registered = new Date(this.dataStoreSvc.getByKey('registered'));
    let work_place = this.dataStoreSvc.getByKey('work_place');
    let avatarUrl = this.dataStoreSvc.getByKey('avatarUrl');

    return { name, email, gender, registered, work_place, avatarUrl } as IUser;
  }

  setUserInfo(user: IUser & { [token: string]: any }) {
    this.dataStoreSvc.save(user);
  }


  erase() {
    this.dataStoreSvc.clear();
  }
}
