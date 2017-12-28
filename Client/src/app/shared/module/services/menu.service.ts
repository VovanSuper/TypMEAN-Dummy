import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable() 
export class MenuService {
  public sideMenuOpened: BehaviorSubject<boolean> = new BehaviorSubject(false);
}