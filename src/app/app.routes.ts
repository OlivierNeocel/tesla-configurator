import { Routes } from '@angular/router';
import {ModelAndColorComponent} from "./components/model-and-color/model-and-color.component";
import {LocalStorageService, SELECTED_CONFIG_KEY, SELECTED_MODEL_KEY} from "./services/local-storage.service";
import {inject} from "@angular/core";

const ConfigGuard = (): boolean => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  return localStorageService.getItem(SELECTED_MODEL_KEY) !== null
    && localStorageService.getItem(SELECTED_MODEL_KEY) !== null;
}

const SummaryGuard = (): boolean => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  return localStorageService.getItem(SELECTED_CONFIG_KEY) !== null;
}
export const routes: Routes = [
  { path: '', component: ModelAndColorComponent },
  {
    path: 'model',
    loadComponent: () => import('./components/model-and-color/model-and-color.component')
      .then((m) => m.ModelAndColorComponent),
  },
  {
    path: 'config',
    loadComponent: () => import('./components/config-and-options/config-and-options.component')
      .then((m) => m.ConfigAndOptionsComponent),
    canActivate: [ConfigGuard]
  },
  {
    path: 'summary',
    loadComponent: () => import('./components/summary/summary.component')
      .then((m) => m.SummaryComponent),
    canActivate:[SummaryGuard]
  }
];
