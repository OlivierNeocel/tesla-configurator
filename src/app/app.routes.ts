import { Routes } from '@angular/router';
import {ModelAndColorComponent} from "./components/model-and-color/model-and-color.component";
import {ConfigGuard} from "./guards/config.guard";
import {SummaryGuard} from "./guards/summary.guard";

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
