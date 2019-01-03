import { IStore } from './interface';
import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class LocalStorageStore<T> implements IStore<T> {
  get(key: string): T {
    return JSON.parse(localStorage.getItem(key) || '{}') || {};
  }

  set(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }
  remove(key: string) {
    localStorage.removeItem(key);
    return true;
  }
}
