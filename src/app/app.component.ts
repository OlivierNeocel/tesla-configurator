import {Component} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  imports: [
    AsyncPipe,
    JsonPipe,
    RouterLink,
    RouterOutlet,
  ],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'TESLA Car Configurator';
}
