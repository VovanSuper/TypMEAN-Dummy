import { Injectable } from '@angular/core';

@Injectable()
export class DataStorageService {
  private storage: Storage = null;

  constructor() {
    if (window.localStorage) {
      this.storage = window.localStorage;
    } else {
      this.storage = window.sessionStorage;
    }
  }

  save(data: { [name: string]: any }) {
    for (let name in data) {
      if (name !== '__proto__' && data[name] !== undefined && name !== 'avatar')
        this.storage.setItem(name, data[name]);
    }
  }

  getByKey(key: string) {
    return this.storage.getItem(key);
  }

  setByKey(key: string, val: string | any) {
    this.storage.setItem(key, val);
  }

  clear() {
    this.storage.clear();
  }

}

