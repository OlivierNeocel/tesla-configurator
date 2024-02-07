import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";
import {StepsComponent} from "./components/steps/steps.component";

import {
  LOCAL_STORAGE,
  NgxWebstorageModule,
  SESSION_STORAGE,
} from 'ngx-webstorage';

@Component({
  imports: [
    AsyncPipe,
    JsonPipe,
    RouterLink,
    RouterOutlet,
    StepsComponent,
  ],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  providers: [
    NgxWebstorageModule,
    { provide: LOCAL_STORAGE, useFactory: () => localStorage },
    { provide: SESSION_STORAGE, useFactory: () => sessionStorage },
  ],
})
export class AppComponent {
  title = 'TESLA Car Configurator';
}
