import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any',
})
export class BrowserStorageService {
  getLocal(key: string): any {
    const data = window.localStorage.getItem(key);
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  setLocal(key: string, value: any): void {
    const data = value === undefined ? '' : value;
    window.localStorage.setItem(key, data);
  }

  removeLocal(key: string): void {
    window.localStorage.removeItem(key);
  }
}
