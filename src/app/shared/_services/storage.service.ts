import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

  public static getItem(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
  }

  public static setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static deleteItem(key) {
    localStorage.removeItem(key);
  }

  public static clearAll() {
    localStorage.clear();
  }
}
