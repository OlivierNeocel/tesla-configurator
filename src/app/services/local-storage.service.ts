import { Injectable } from '@angular/core';
import {filter, fromEvent, Observable, tap} from "rxjs";

export const SELECTED_MODEL_KEY: string = 'selectedModel';
export const SELECTED_COLOR_KEY: string = 'selectedColor';
export const SELECTED_CONFIG_KEY: string = 'selectedConfig';
export const INCLUDE_TOW_KEY: string = 'includeTow';
export const INCLUDE_YOKE_KEY: string = 'includeYoke';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public localStorageChanged$: Observable<StorageEvent> = fromEvent<StorageEvent>(window, "storage")
    .pipe(
      tap((event => console.log('local storage changed - event.key = ', event.key))),
      filter(
        event => {
          return (event.key === SELECTED_MODEL_KEY || event.key === SELECTED_COLOR_KEY
            || event.key === SELECTED_CONFIG_KEY || event.key === INCLUDE_TOW_KEY || event.key === INCLUDE_YOKE_KEY)
        },
      ),
    );

  constructor() { }

  // Set a value in local storage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Get a value from local storage
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Remove a value from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }
}
