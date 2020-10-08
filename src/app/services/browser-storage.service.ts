import { Injectable } from '@angular/core';
import { defaultCountryCode } from '../constants/constants';

@Injectable({
  providedIn: 'any',
})
export class BrowserStorageService {
  getLocal(key: string): any {
    return window.localStorage.getItem(key);

  }

  getCountryCode(key: string): string {
    const countryCode = this.getLocal(key);
    if (!countryCode) {
      return defaultCountryCode;
    }
    return countryCode;
  }


  setLocal(key: string, value: any): void {
    const data = value === undefined ? '' : value;
    window.localStorage.setItem(key, data);
  }

  removeLocal(key: string): void {
    window.localStorage.removeItem(key);
  }
}
