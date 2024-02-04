import { Injectable } from '@angular/core';

export const SELECTED_MODEL_KEY: string = 'selectedModel';
export const SELECTED_COLOR_KEY: string = 'selectedColor';
export const SELECTED_CONFIG_KEY: string = 'selectedConfig';
export const INCLUDE_TOW_KEY: string = 'includeTow';
export const INCLUDE_YOKE_KEY: string = 'includeYoke';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

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
